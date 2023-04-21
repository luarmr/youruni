import { makeAutoObservable, runInAction } from 'mobx';
import Papa from 'papaparse';

export interface University {
  id: string;
  name: string;
  city: string;
  state: string;
  url: string;
}

class Universities {
  constructor() {
    makeAutoObservable(this);
  }

  error: boolean = false;
  loading: boolean = false;
  contentLoaded: boolean = false;
  universities: University[] = [];
  searchTerm: string = '';

  get isEmpty(): boolean {
    return this.universities.length === 0;
  }

  get filteredUniversities(): University[] {
    return this.universities.filter(university => {
      return (
        university.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        university.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        university.state.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  async getUniversities() {
    if (this.universities.length > 0) {
      return;
    }
    this.error = false;
    this.loading = true;
    this.contentLoaded = false;
    const url: string =
      'https://gist.githubusercontent.com/simonlast/d5a86ba0c82e1b0d9f6e3d2581b95755/raw/f608b9b896dd3339df13dae317998d5f24c00a50/edu-scorecard.csv';

    try {
      const response: Response = await fetch(url);

      if (response.ok) {
        const csvText = await response.text();
        const parsedCSV = Papa.parse(csvText, {
          header: false,
          skipEmptyLines: true
        });

        runInAction(() => {
          this.error = false;
          this.loading = false;
          this.contentLoaded = true;
          this.universities = (parsedCSV.data as string[][])
            .map((row: string[]) => this.mapCSVRow(row))
            .filter((row): row is University => row !== null)
            .sort((a: University, b: University) => a.name.localeCompare(b.name));
        });
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      runInAction(() => {
        this.error = true;
        this.loading = false;
        this.contentLoaded = false;
        console.error(error);
        this.universities = [];
      });
    }
  }

  private mapCSVRow(row: string[]): University | null {
    const [id, name, city, state, url] = row;

    if (!id || !name || !city || !state || !url) {
      console.warn('Invalid row:', row);
      return null;
    }
    return { id, name, city, state, url };
  }
}

export default Universities;

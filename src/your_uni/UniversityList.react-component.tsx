import { observer } from 'mobx-react';
import { Component } from 'react';

import Universities, { University } from './Universities.mobx-store';
import UniversityCard from './UniversityCard.react-component';
import styles from './UniversityList.module.css';

interface Props {
  UniversitiesStore: Universities;
}

class UniversitiesList extends Component<Props> {
  componentDidMount() {
    this.props.UniversitiesStore.getUniversities();
  }

  render() {
    const { UniversitiesStore } = this.props;

    if (UniversitiesStore.loading) {
      return (
        <div aria-live="polite" className={styles.info}>
          Loading Universities...
        </div>
      );
    }

    if (UniversitiesStore.error) {
      return (
        <div aria-live="assertive" aria-atomic="true" className={styles.info}>
          Error: Could not fetch Universities data
        </div>
      );
    }

    if (UniversitiesStore.isEmpty) {
      return <div className={styles.info}>No Universities found</div>;
    }

    return (
      <>
        <div className={styles.search}>
          <label htmlFor="search-University" className="sr-only">
            Search for a University:
          </label>
          <input
            className={styles.searchInput}
            id="search-University"
            type="text"
            placeholder="Enter your text to filter the University list"
            value={UniversitiesStore.searchTerm}
            onChange={event => UniversitiesStore.setSearchTerm((event.target as HTMLInputElement).value)}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                event.preventDefault();
                UniversitiesStore.setSearchTerm((event.target as HTMLInputElement).value);
                const UniversityListNode = document.getElementById('Universities-list');
                UniversityListNode && UniversityListNode.focus();
              }
            }}
            aria-describedby="dynamic-search-description"
          />
        </div>
        <div id="dynamic-search-description" className="sr-only">
          Search results will update as you type.
        </div>
        <div className="sr-only" aria-live="polite">
          {UniversitiesStore.filteredUniversities.length} Universities found
        </div>
        {UniversitiesStore.filteredUniversities.length === 0 && (
          <div aria-live="assertive" aria-atomic="true" className={styles.info}>
            No Universities found for the search term.
          </div>
        )}
        <div className={styles.cardsContainer}>
          {UniversitiesStore.filteredUniversities.map((university: University) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </div>
      </>
    );
  }
}

export default observer(UniversitiesList);

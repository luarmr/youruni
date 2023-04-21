import styles from './App.module.css';
import SkipToMainContentReactComponent from './base_components/SkipToMainContent.react-component';
import Header from './your_uni/Header.react-component';
import PageBanner from './your_uni/PageBanner.react-component';
import Universities from './your_uni/Universities.mobx-store';
import UniversitiesList from './your_uni/UniversityList.react-component';

const universityStore = new Universities();
const App = function App() {
  const mainContentId = 'main_content';
  return (
    <div className={styles.wrapper}>
      <SkipToMainContentReactComponent mainContentId={mainContentId} />
      <Header />
      <main id={mainContentId}>
        <section>
          <PageBanner />
          <UniversitiesList UniversitiesStore={universityStore} />
        </section>
      </main>
    </div>
  );
};

export default App;

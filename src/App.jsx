import './App.css';
import { useState } from "react";
import TitlePage from './TitlePage';
import EditorPage from './EditorPage';
import LayoutPage from './LayoutPage';
import DesignPage from './DesignPage';
import PreviewPage from './PreviewPage';

class PhotoObject{
    constructor(id, filename, caption, url, date){
        this.id = id;
        this.filename = filename;
        this.caption = caption;
        this.url = url;
        this.date = date;
    }

}

function PageSelector({ page, setPage, albumTitle, setAlbumTitle, photos, setPhotos }) {
  if (page === "title") {
    return (
      <TitlePage
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        setPage={setPage}
      />
    );
  }

  if (page === "editor") return <EditorPage setPage={setPage} photos={photos} setPhotos={setPhotos} />;
  if (page === "layout") return <LayoutPage setPage={setPage} />;
  if (page === "design") return <DesignPage setPage={setPage} />;
  if (page === "preview") return <PreviewPage setPage={setPage} photos={photos} />;

  return null;
}

const expl_objects = [
    new PhotoObject(0, "IMG_20190622_160211.jpg", "test1", "/IMG_20190622_160211.jpg", "22.06.2019"),
    new PhotoObject(1, "IMG_20190630_003521.jpg", "test1", "/IMG_20190630_003521.jpg", "30.06.2019"),
    new PhotoObject(2, "IMG_20190630_122725.jpg", "test1", "/IMG_20190630_122725.jpg", "30.06.2019"),
    new PhotoObject(3, "IMG_20190702_191256.jpg", "test1", "/IMG_20190702_191256.jpg", "02.07.2019"),
]

function App() {
  const [page, setPage] = useState("title");
  const [albumTitle, setAlbumTitle] = useState("");
  const [photos, setPhotos] = useState(expl_objects);

  return (
    <div className="App">
      <PageSelector
        page={page}
        setPage={setPage}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        photos={photos}
        setPhotos={setPhotos}
      />
    </div>
  );
}

export default App;

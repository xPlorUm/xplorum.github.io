import './EditorPage.css';
import { useState } from "react";
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import NavBar from './NavBar';

// ─── PDF Styles ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Each PDF page is a landscape A4, acting as a two-page spread
  spread: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    width: '100%',
    height: '100%',
  },

  // Left or right half of the spread
  albumPage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    borderRightWidth: 1,       // spine line between the two halves
    borderRightColor: '#CCC',
    borderRightStyle: 'solid',
  },
  albumPageRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  // Photo + caption block
  photoBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  photo: {
    width: '100%',
    maxHeight: 320,
    objectFit: 'contain',
    marginBottom: 8,
    borderRadius: 3,
  },
  caption: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    marginBottom: 3,
  },
  date: {
    fontSize: 9,
    color: '#888',
    textAlign: 'center',
  },

  // Empty slot (odd number of photos — last page right side is blank)
  emptySlot: {
    flex: 1,
  },

  // Page number row at the bottom of the spread
  pageNumberRow: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  pageNumber: {
    fontSize: 9,
    color: '#AAA',
  },
});

// ─── Photo slot ───────────────────────────────────────────────────────────────

function PhotoSlot({ photo, side }) {
  if (!photo) return <View style={styles.emptySlot} />;

  return (
    <View style={side === 'left' ? styles.albumPage : styles.albumPageRight}>
      <View style={styles.photoBlock}>
        <Image style={styles.photo} src={photo.url} />
        {photo.caption ? (
          <Text style={styles.caption}>{photo.caption}</Text>
        ) : null}
        {photo.date ? (
          <Text style={styles.date}>{photo.date}</Text>
        ) : null}
      </View>
    </View>
  );
}

// ─── Document ────────────────────────────────────────────────────────────────

function AlbumDoc({ photos }) {
  // Group photos into pairs — each pair = one spread (landscape A4 page)
  const spreads = [];
  for (let i = 0; i < photos.length; i += 2) {
    spreads.push([photos[i], photos[i + 1] ?? null]);
  }

  // Edge case: no photos yet → render a single blank placeholder page
  if (spreads.length === 0) {
    spreads.push([null, null]);
  }

  return (
    <Document>
      {spreads.map(([left, right], spreadIndex) => {
        // Left page number  = spreadIndex * 2 + 1
        // Right page number = spreadIndex * 2 + 2
        const leftNum  = spreadIndex * 2 + 1;
        const rightNum = spreadIndex * 2 + 2;

        return (
          // Landscape A4 so both halves sit side-by-side naturally
          <Page key={spreadIndex} size="A4" orientation="landscape" style={styles.spread}>
            <PhotoSlot photo={left}  side="left" />
            <PhotoSlot photo={right} side="right" />

            {/* Page numbers */}
            <View style={styles.pageNumberRow}>
              <Text style={styles.pageNumber}>{leftNum}</Text>
              <Text style={styles.pageNumber}>{rightNum}</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
}

// ─── PreviewPage ─────────────────────────────────────────────────────────────

function PreviewPage({ setPage, photos }) {
  return (
    <div className='container'>
      <NavBar setPage={setPage} />
      <p>Preview</p>
      <PDFViewer width="100%" height="700px">
        <AlbumDoc photos={photos ?? []} />
      </PDFViewer>
    </div>
  );
}

export default PreviewPage;
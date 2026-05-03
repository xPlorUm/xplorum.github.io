import './App.css';
import { useState } from "react";

function ProductRow({product}){
  const fontColor = product.stocked ? "black" : "red"
    return (
        <tr>
          <td style={{color : fontColor}}>{product.name}</td>
          <td>{product.price}</td>
        </tr>
    );
}

function ProductCategoryRow({name}){
    return (
        <tr>
          <th colSpan={2}>{name}</th>
        </tr>
    );
}


function ProductTable({
  products
}){
  let rows = []
  let lastCategory = '';
  products.forEach( function(e){
    if(lastCategory !== e.category){
      rows.push(<ProductCategoryRow name={e.category} key={e.category}/>);
      lastCategory = e.category;
    }

    rows.push(<ProductRow product={e} key={e.name}/>);

  })

  return (
      <table className='tableContainer'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
  );
}


function SearchBar({
    filterText, 
    inStockOnly, 
    OnFilterTextChange, 
    OnInStockOnlyChange}
){
    return (
        <form>
            <input type="text" placeholder="Search..." value={filterText} onChange={(e) => OnFilterTextChange(e.target.value)}/>
            <div>
                <input type="checkbox" id="inStockOnly" checked={inStockOnly} onChange={(e) => OnInStockOnlyChange(e.target.checked)}/>
                <label htmlFor="inStockOnly">Only show products in stock</label>
            </div>
        </form>
    );
}

function FilterableProductTable({
  products
}){
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    function isInStock(product){
      return((inStockOnly && product.stocked) || !inStockOnly);
    }

    function isFilteredText(product){
      // const pattern = new RegExp(filterText, 'i');
      return product.name.toLowerCase().includes(filterText.toLowerCase());
    }
    const filteredProducts = products.filter(function(e){
      return isInStock(e) && isFilteredText(e);
    });

    return (
        <div className="table-container">
            <SearchBar 
                filterText={filterText}
                inStockOnly={inStockOnly}
                OnFilterTextChange={setFilterText}
                OnInStockOnlyChange={setInStockOnly}/>
            <ProductTable products={filteredProducts}/>
        </div>
    );
}


const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];


function App() {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS}/>
    </div>
  );
}

export default App;

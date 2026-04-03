function handleClick() {
    const output = document.getElementById("output");

    const now = new Date();
    output.textContent = "You clicked at: " + now.toLocaleTimeString();

    console.log("Button clicked!");
}
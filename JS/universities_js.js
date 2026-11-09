const qInput = document.getElementById("q");
const divStatus = document.getElementById("status");
const tbody = document.getElementById("tbody");
let all =[];

console.log(qInput);
console.log(divStatus);
console.log(tbody);

function setStatus(text) {
    divStatus.textContent = text;
}


const API_URL = "http://universities.hipolabs.com/search?country=Romania";

async function loadUniversities() {
    const response = await fetch(API_URL);
    const data = await response.json();

    all = data;
    render(all);
    console.log(response);
    console.log(data);
}

loadUniversities();

qInput.addEventListener("input", () => {
    const text = qInput.value.trim().toLowerCase();
    const filtered = all.filter(university => university.name.toLowerCase().includes(text));
    render(filtered);
    setStatus(`Filtrate: ${filtered.length} din ${all.length}`);
});

function render(data) {
    tbody.innerHTML = data.map(university => {
        const site = university.web_pages?.[0]
        ? `<a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a>`
        : ""; 
        return `<tr>
            <td>${university.name}</td>
            <td>${university.country}</td>
            <td>${site}</td>
        </tr>`
    }).join("");
}


function exportCSV(data) {
    if(!data.length) {
        return alert("Nu există date de exportat!");
    }

    const header = ["Name", "Country", "Web Pages"];
    const rows = data.map(university => [
        university.name,
        university.country,
        university.web_pages?.[0] || ""
    ]);

    const spreadsheet = [header, ...rows]
        .map(row => row.join(","))
        .join("\n");
    
    const blob = new Blob([spreadsheet], { type: "text/csv;charset=utf-8" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "universities.csv";

    a.click();

    URL.revokeObjectURL(url);

}




    const CSVbutton = document.getElementById("CSVbutton");

    CSVbutton.addEventListener("click", () => {
        exportCSV(all);
    });

const modal = document.getElementById("bootcampModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const form = document.getElementById("bootcampForm");
const tableBody = document.getElementById("bootcampTableBody");


let bootcamps = JSON.parse(localStorage.getItem("bootcamps")) || [];


function saveToLocalStorage() {
    localStorage.setItem("bootcamps", JSON.stringify(bootcamps));
}


openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    console.log("test")
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newBootcamp = {
        title: document.getElementById("title").value,
        duration: document.getElementById("duration").value,
        level: document.getElementById("level").value,
        price: Number(document.getElementById("price").value)
    };

    bootcamps.push(newBootcamp);

    saveToLocalStorage();
    renderTable();

    form.reset();
    modal.style.display = "none";
});


function renderTable() {
    tableBody.innerHTML = "";

    if (bootcamps.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding:20px;">
                    Belum ada data bootcamp
                </td>
            </tr>
        `;
        return;
    }

    bootcamps.forEach((bootcamp, index) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${bootcamp.title}</td>
            <td>${bootcamp.duration}</td>
            <td>${bootcamp.level}</td>
            <td>Rp ${bootcamp.price.toLocaleString("id-ID")}</td>
            <td>
                <span class="material-symbols-outlined edit-icon">edit</span>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

renderTable();

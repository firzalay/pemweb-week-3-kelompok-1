const modal = document.getElementById("bootcampModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const form = document.getElementById("bootcampForm");
const tableBody = document.getElementById("bootcampTableBody");
const modalTitle = document.querySelector(".modal-content h2");

let bootcamps = JSON.parse(localStorage.getItem("bootcamps")) || [];
let editIndex = null;

function saveToLocalStorage() {
    localStorage.setItem("bootcamps", JSON.stringify(bootcamps));
}

openModalBtn.addEventListener("click", function () {
    form.reset();
    editIndex = null;
    modalTitle.textContent = "Tambah Bootcamp";
    modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const bootcampData = {
        title: document.getElementById("title").value.trim(),
        duration: document.getElementById("duration").value.trim(),
        level: document.getElementById("level").value,
        price: Number(document.getElementById("price").value),
        type: document.getElementById("type").value.trim(),
        benefit: document.getElementById("benefit").value.trim(),
        description: document.getElementById("description").value.trim(),
        mentor: document.getElementById("mentor").value.trim(),
    };

    if (!validateBootcamp(bootcampData)) {
        return;
    }

    if (editIndex === null) {
        bootcamps.push(bootcampData);
    } else {
        bootcamps[editIndex] = bootcampData;
        editIndex = null;
    }

    saveToLocalStorage();
    renderTable();

    form.reset();
    modal.style.display = "none";
});

function editBootcamp(index) {
    const bootcamp = bootcamps[index];

    document.getElementById("title").value = bootcamp.title;
    document.getElementById("duration").value = bootcamp.duration;
    document.getElementById("level").value = bootcamp.level;
    document.getElementById("price").value = bootcamp.price;

    editIndex = index;
    modalTitle.textContent = "Edit Bootcamp";
    modal.style.display = "flex";
}

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

    bootcamps.forEach(function (bootcamp, index) {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${bootcamp.title}</td>
            <td>${bootcamp.duration}</td>
            <td>${bootcamp.level}</td>
            <td>Rp ${bootcamp.price.toLocaleString("id-ID")}</td>
            <td>
                <span class="material-symbols-outlined edit-icon" style="cursor:pointer;">edit</span>
            </td>
        `;

        const editBtn = tr.querySelector(".edit-icon");
        editBtn.addEventListener("click", function () {
            editBootcamp(index);
        });

        tableBody.appendChild(tr);
    });
}

function validateBootcamp(data) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const textRegex = /[A-Za-z]/;

    if (!nameRegex.test(data.title)) {
        alert("Nama bootcamp hanya boleh berisi huruf dan spasi.");
        return false;
    }

    if (!nameRegex.test(data.mentor)) {
        alert("Nama mentor hanya boleh berisi huruf dan spasi.");
        return false;
    }

    if (data.price <= 0 || isNaN(data.price)) {
        alert("Harga harus lebih dari 0.");
        return false;
    }

    if (!textRegex.test(data.duration)) {
        alert("Durasi harus mengandung teks (contoh: 3 Bulan).");
        return false;
    }

    if (data.type.trim() === "" || data.benefit.trim() === "" || data.description.trim() === "") {
        alert("Semua field harus diisi.");
        return false;
    }

    return true;
}

renderTable();

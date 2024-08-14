import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js';
import {
	getDatabase,
	ref,
	onValue,
	set,
	get,
	child,
	update,
	remove,
} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js';

const firebaseConfig = {
	apiKey: 'AIzaSyDc9Dj4rAvP93aHKHycjfSjkEHu8YgPq0k',
	authDomain: 'webcrud-7add2.firebaseapp.com',
	databaseURL: 'https://webcrud-7add2-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'webcrud-7add2',
	storageBucket: 'webcrud-7add2.appspot.com',
	messagingSenderId: '780208385781',
	appId: '1:780208385781:web:37b05cdfcba9bcc27f1fbc',
	measurementId: 'G-ND680W0WG6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// Reference to the data location
const employeesRef = ref(db, 'EmployeeSet/');

// DOM element where data will be displayed
const dataList = document.getElementById('dataList');

// Retrieve data from Firebase and display it
onValue(employeesRef, (snapshot) => {
	dataList.innerHTML = ''; // Clear previous data
	snapshot.forEach((childSnapshot) => {
		const employee = childSnapshot.val();
		const row = document.createElement('tr');
		row.innerHTML = `            
            <td>${employee.nameofemployee.firstname}</td>
            <td>${employee.nameofemployee.lastname}</td>
            <td>${employee.department}</td>
            <td>${employee.cnic}</td>
            <td>${employee.canswim ? 'Yes' : 'No'}</td>
        `;
		dataList.appendChild(row);
	});
});

// Ambil elemen input dan tombol
const Fnameinp = document.getElementById('Fnameinp');
const Lnameinp = document.getElementById('Lnameinp');
const Deptinp = document.getElementById('Deptinp');
const swiminp = document.getElementById('swiminp');
const Cnicinp = document.getElementById('Cnicinp');

const AddBtn = document.getElementById('AddBtn');
const RetBtn = document.getElementById('RetBtn');
const UpdBtn = document.getElementById('UpdBtn');
const DltBtn = document.getElementById('DltBtn');

// Fungsi untuk membersihkan input
function clearInputs() {
	Fnameinp.value = '';
	Lnameinp.value = '';
	Deptinp.value = '';
	swiminp.value = '';
	Cnicinp.value = '';
}

// Fungsi untuk menampilkan pesan
function showMessage(message) {
	alert(message);
}

// Fungsi menambah data
function addData() {
	if (Cnicinp.value && Fnameinp.value && Lnameinp.value) {
		set(ref(db, 'EmployeeSet/' + Cnicinp.value), {
			nameofemployee: {
				firstname: Fnameinp.value,
				lastname: Lnameinp.value,
			},
			department: Deptinp.value,
			canswim: swiminp.value === 'yes',
			cnic: Number(Cnicinp.value),
		})
			.then(() => {
				showMessage(
					'Data berhasil ditambahkan'
				);
				clearInputs();
			})
			.catch((error) => {
				showMessage('Data gagal ditambahkan');
				console.error(error);
			});
	} else {
		showMessage('Mohon isi semua input');
	}
}

// Fungsi mengambil data
function retData() {
	const dbref = ref(db);

	if (Cnicinp.value) {
		get(child(dbref, 'EmployeeSet/' + Cnicinp.value))
			.then((snapshot) => {
				if (snapshot.exists()) {
					Fnameinp.value =
						snapshot.val().nameofemployee.firstname;
					Lnameinp.value =
						snapshot.val().nameofemployee.lastname;
					Deptinp.value =
						snapshot.val().department;
					swiminp.value =
						snapshot.val()
							.canswim
							? 'yes'
							: 'no';
				} else {
					showMessage(
						'Data tidak ditemukan'
					);
				}
			})
			.catch((error) => {
				showMessage('Gagal mengambil data');
				console.error(error);
			});
	} else {
		showMessage('Mohon masukkan CNIC');
	}
}

// Fungsi memperbarui data
function updateData() {
	if (Cnicinp.value) {
		update(ref(db, 'EmployeeSet/' + Cnicinp.value), {
			nameofemployee: {
				firstname: Fnameinp.value,
				lastname: Lnameinp.value,
			},
			department: Deptinp.value,
			canswim: swiminp.value === 'yes',
		})
			.then(() => {
				showMessage('Data berhasil diperbarui');
				clearInputs();
			})
			.catch((error) => {
				showMessage('Gagal memperbarui data');
				console.error(error);
			});
	} else {
		showMessage('Mohon masukkan CNIC');
	}
}

// Fungsi menghapus data
function deleteData() {
	if (Cnicinp.value) {
		remove(ref(db, 'EmployeeSet/' + Cnicinp.value))
			.then(() => {
				showMessage('Data berhasil dihapus');
				clearInputs();
			})
			.catch((error) => {
				showMessage('Gagal menghapus data');
				console.error(error);
			});
	} else {
		showMessage('Mohon masukkan CNIC');
	}
}

// Event listener untuk tombol
AddBtn.addEventListener('click', addData);
RetBtn.addEventListener('click', retData);
UpdBtn.addEventListener('click', updateData);
DltBtn.addEventListener('click', deleteData);

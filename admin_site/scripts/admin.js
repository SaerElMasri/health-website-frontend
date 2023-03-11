document.querySelector('#add-action').onclick = () => {
    let name = document.getElementById('name')
    let email = document.getElementById('email')
    let phone = document.getElementById('phone')
    let address = document.getElementById('address')
    let facebook = document.getElementById('facebook')

    const data = new FormData()
    data.append('hospital_name',name.value)
    data.append('hospital_email',email.value)
    data.append('hospital_phoneNumber',phone.value)
    data.append('hospital_address',address.value)
    data.append('facebook_url',facebook.value)

    if(name.value =="" && email.value =="" && phone.value =="" && address.value =="" && facebook.value ==""){
        alert("Required all fields")
    }else{
        axios.post("http://localhost/health-website-backend/insert_hospital.php", data).then((res) => {
            console.log(res);
            if(res.data.status == 'Success'){
                alert("Hospital Inserted");
            }else{
                alert('Error')
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

const fetchHospitals = async () => {
    await fetch("http://localhost/health-website-backend/display_hospital.php").then((res) => {
        return res.json()
    }).then((data)=> {
        data.forEach(element => {
            console.log(element);
            const markup = `<div class="hospital-component">
                <h1>${element.hospital_name}</h1>
                <p><a href="#" id="edit-action" data-id="${element.hospital_id}">Edit</a></p>
                <p><a href="#" id="remove-action" data-id="${element.hospital_id}">Delete</a></p>
                </div>
            `
            document.querySelector(".list-hospitals").insertAdjacentHTML("beforeend",markup);
        });
        
    }).catch((err) => {
        console.log(err);
    })
}
fetchHospitals();
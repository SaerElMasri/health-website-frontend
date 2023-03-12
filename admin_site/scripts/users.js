const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost/health-website-backend/display_patients.php');
      const hospitals = await response.json();
      const select = document.getElementById('user-select');
      hospitals.forEach((patient) => {
        const option = document.createElement('option');
        const name = patient.first_name + " " + patient.last_name
        option.value = patient.id;
        option.text = name;
        select.appendChild(option);
      });
    } catch (error) {
      console.log(error);
    }
  };

fetchUser();

const fetchHospitals = async () => {
    try {
      const response = await fetch('http://localhost/health-website-backend/display_hospital.php');
      const hospitals = await response.json();
      const select = document.getElementById('hospital-select');
      hospitals.forEach((hospital) => {
        const option = document.createElement('option');
        option.value = hospital.hospital_id;
        option.text = hospital.hospital_name;
        select.appendChild(option);
      });
    } catch (error) {
      console.log(error);
    }
  };

fetchHospitals();

document.querySelector('#add-action').onclick = () => {
    let selectedHospital = document.getElementById('hospital-select')
    let selectedPatient = document.getElementById('user-select')
    const data = new FormData()
    data.append("patient_id", selectedPatient.value)
    data.append("hospital_id", selectedHospital.value)

    console.log(selectedHospital.value);
    console.log(selectedPatient.value);
    if(selectedHospital && selectedPatient){
        axios.post('http://localhost/health-website-backend/hospital_patient.php', data).then((res) => {
            console.log(res.data.status);
            if(res.data.status === 'Success'){
                alert('Patient assigned')
            }else{
                alert('Something went wrong')
            }
        }).catch((err) => {
            console.log(err);
        })        
    }
    
}
let patientId = 72
const fetchUser = async() => {
    await fetch('http://localhost/health-website-backend/status_service.php').then((response)=>{
        return response.json();
    }).then(data => {
        data.forEach(table => {
          const user_id = table.patient_id;
          const service_id = table.service_id;
          const status = table.status;
          getUserInfo(user_id, service_id, status);
        });
    }).catch((err) => {
        console.log(err);
    });
}
fetchUser();

const getUserInfo = (id, service, status) => {
    axios.get(`http://localhost/health-website-backend/user_by_id.php`, {
        params: {
            'id':id,
            'tableName': 'partients_info'
        }
    }).then((res) => {
        patientId = res.data[0].user_id;
        axios.get(`http://localhost/health-website-backend/user_by_id.php`, {
        params: {
            'id': patientId,
            'tableName': 'users'
        }
        }).then((res) => {
            let username = res.data[0].first_name + " " + res.data[0].last_name;
            getServiceName(service, username, status, id)
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
    console.log(err);
    });
}
const getServiceName = (id, username, status, patientID) => {
    axios.get("http://localhost/health-website-backend/user_by_id.php", {
        params: {
            "id":id,
            "tableName": "services"
        }
    }).then((res) => {
        const markup = ` 
            <div class="user-component">
                <div class="user-info">
                    
                    <h2>${username}</h2>
                    <h3>${res.data[0].name}</h3>
                    <h3>${status}</h3>
                    <label>
                        Accept 
                        <input type="radio" name="status" value='Accept'>
                    </label>
                    <label>
                        Reject
                        <input type="radio" name="status" value='Reject'>
                    </label>
                    <div>
                        <button id="status-action">Update Status</button>                    
                    </div>
                </div>
            </div>`
        const element = document.createRange().createContextualFragment(markup);
        const radios = element.querySelectorAll('input[type="radio"]');        
        let selectedValue;
        radios.forEach((radio) => {
            radio.addEventListener('click', () => {
                selectedValue = radio.value;
            }); 
        });
        const button = element.querySelectorAll('#status-action');
        const data = new FormData();
        data.append("patient_id", patientID);
        button.forEach((radio) => {
            radio.addEventListener('click', () => {
                data.append("status", selectedValue);
                axios.post('http://localhost/health-website-backend/approve_service.php', data).then((res) => {
                    location.reload();
                }).catch((err) => {
                    console.log(err);
                });
            });
        });  
        document.querySelector(".user-service").appendChild(element); 
    }).catch((err) => {
        console.log(err);
    })
}
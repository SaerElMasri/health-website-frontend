const param_id = new URLSearchParams(window.location.search);
const user_id = param_id.get('id');

const fetchService = async() => {
    await fetch('http://localhost/health-website-backend/display_services.php').then((response)=>{
        return response.json();
    }).then(data => {
        console.log(data);
        data.forEach(prod => {
            const markup = `
            <div class="service-component">
                <div class="service-img"></div>
                <div class="service-info">
                    <h1>${prod.name}</h1>
                    <h3>${prod.cost}$</h3>
                    <p>${prod.description}</p>
                    <button id="service-btn" data-id="${prod.id}">Add Service</button>
                </div>
                
            </div>
            `;
            const element = document.createRange().createContextualFragment(markup);
            const buttons = element.querySelectorAll('#service-btn');

            buttons.forEach((button) => {
                const data = new FormData();
                const service_id = button.getAttribute("data-id");
                data.append("patient_id", user_id);
                data.append("service_id", service_id);
                data.append("status", "Pending");

                button.addEventListener('click', () => {
                    axios.post('http://localhost/health-website-backend/user_service.php', prod_data).then((res) => {
                        console.log(res);
                        if(res.data.status === 200){
                            alert('Service register, waiting to approval')
                        }else{
                            alert('Something went wrong')
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });  
            document.querySelector(".services-section").appendChild(element); 
        });
    }).catch((err) => {
        console.log(err);
    });
}
fetchService();
const param_id = new URLSearchParams(window.location.search);
const user_id = param_id.get('id');

const fetchProducts = async() => {
    await fetch('http://localhost/health-website-backend/display_medications.php').then((response)=>{
        return response.json();
    }).then(data => {
        console.log(data);
        data.forEach(prod => {
            const markup = `
            <div class="medication-component">
                <div class="medication-img">
                    <img src="${prod.img_url}" alt="" class="meds-img">
                </div>
                <div class="medication-info">
                    <div class="info-section">
                        <h2>${prod.name}</h2>
                        <div class="section-price">
                            <h3>${prod.cost}$</h3>
                            <input type="number" placeholder="Quantity" id='quantity'>
                        </div>
                    </div>
                    <div class="icon-buy">
                        <div class="cart-img" id="shop-action" data-id="${prod.id}"></div>
                    </div>
                </div>
            </div>
            `;
            const element = document.createRange().createContextualFragment(markup);
            const buttons = element.querySelectorAll('#shop-action');

            buttons.forEach((button) => {
                const prod_data = new FormData();
                const product_id = button.getAttribute("data-id");
                const quantity = element.querySelector('#quantity');
                prod_data.append("patient_id", user_id);
                prod_data.append("quantity", quantity.value);
                prod_data.append("medication_id", product_id);

                button.addEventListener('click', () => {
                    axios.post('http://localhost/health-website-backend/user_medication.php', prod_data).then((res) => {
                        console.log(res);    
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });  
            document.querySelector(".phamacy-section").appendChild(element); 
        
        });
    }).catch((err) => {
        console.log(err);
    });
}
fetchProducts();
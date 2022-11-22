async function request(user, key) {

    //Fetch request options
    const options = {
        headers: {
            "Authorization": "Bearer " + key
        }
    };

    //Queries
    const apiURL = "https://api.stripe.com";
    const customerQuery = "/v1/customers/search?query=email:" + "\"" + user + "\"";

    //Fetch User ID
    let callForID = await fetch(apiURL + customerQuery, options);

    //Fetch successfully
    if (callForID.status === 200) {
        let IDresponse = await callForID.json();
        //If user has subscriptions
        if (IDresponse.data.length !== 0) {
            //Get User ID
            let userID = IDresponse.data[0].id;
            //Build Invoice Query
            let invoicesQuery = "/v1/invoices/search?query=customer:" + "\"" + userID + "\"";
            //Fetch for Invoices
            let callForInvoices = await fetch(apiURL + invoicesQuery, options);
            //Stripe Response
            let invoicesResponse = await callForInvoices.json();
            //Place data in the DOM
            document.getElementById("invoice-message").innerText = "Invoices:";
            //For each invoice create a link 
            invoicesResponse.data.forEach((each) => {
                //Add invoice date 
                let time = each.created;
                let timestamp = new Date(time * 1000).toISOString().slice(0, 10).replace("T", " ");
                let item = document.createElement("a");
                item.innerText = timestamp;
                //Add invoice PDF as link
                item.classList.add('invoice-link');
                item.setAttribute("href", each.invoice_pdf);
                item.setAttribute("target", "_blank");
                //Append item to DOM
                document.getElementById("invoice-list").appendChild(item);
            });
        }
        //If user does not have subcriptions
        else {
            document.getElementById("invoice-message").innerText = "No Invoices Available.";
        }
    } 
    //Fetch Unsuccessful
    else {
        document.getElementById("invoice-message").innerText = "Error. Check your console";
    }



}





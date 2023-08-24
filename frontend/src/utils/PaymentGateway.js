const displayRazorpay = async(razorpay_key, paymentPrice, setPayment_id) => {
    // https://femme-cab-api.vercel.app
    const data = await fetch(`https://femme-cab-1pdfbnfu3-mishikaa.vercel.app/razorpay?price=${paymentPrice}`, {
        method: 'POST'
    }).then((t) => t.json())

    // console.log(data)
    const options = {
        key: razorpay_key,
        currency: data.currency,
        amount: data.amount,
        description: 'Wallet transaction',
        payment_id: data.id,
        handler: function(response) {
            setPayment_id(response.razorpay_payment_id)
            // alert("PAYMENT ID: " + response.razorpay_payment_id)
            // alert("ORDER ID: " + response.razorpay_order_id)
        },
        prefill: {
            name: 'Mili',
            email: 'mili@gmail.com',
            contact: '4365476567'
        }
    }

    // Display the window on button click
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

export default displayRazorpay;

// Kerupuk Atom Mentai - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityDisplay = document.getElementById('quantity');
    const quantityInput = document.getElementById('jumlahPesanan');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const deliveryOption = document.getElementById('deliveryOption');
    const pickupOption = document.getElementById('pickupOption');
    const alamatGroup = document.getElementById('alamatGroup');
    const pickupInfo = document.getElementById('pickupInfo');
    const submitBtn = document.getElementById('submitBtn');

    const PRICE_PER_ITEM = 15000;
    let quantity = 1;

    // Format currency
    function formatCurrency(amount) {
        return 'Rp ' + amount.toLocaleString('id-ID');
    }

    // Update quantity display
    function updateQuantity(newQty) {
        quantity = Math.max(1, newQty);
        quantityDisplay.textContent = quantity;
        quantityInput.value = quantity;
        totalPriceDisplay.textContent = formatCurrency(quantity * PRICE_PER_ITEM);
        decreaseBtn.disabled = quantity <= 1;
    }

    // Quantity controls
    decreaseBtn.addEventListener('click', function() {
        updateQuantity(quantity - 1);
    });

    increaseBtn.addEventListener('click', function() {
        updateQuantity(quantity + 1);
    });

    // Method selection
    const methodInputs = document.querySelectorAll('input[name="metodePengambilan"]');
    methodInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            deliveryOption.classList.toggle('active', this.value === 'delivery');
            pickupOption.classList.toggle('active', this.value === 'pickup');
            
            if (this.value === 'delivery') {
                alamatGroup.style.display = 'flex';
                pickupInfo.style.display = 'none';
            } else {
                alamatGroup.style.display = 'none';
                pickupInfo.style.display = 'block';
            }
        });
    });

    // Show toast notification
    function showToast(message, type) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast ' + type + ' show';
        
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }

    // Form submission
    orderForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(orderForm);
        const metode = formData.get('metodePengambilan');
        
        // Validate address for delivery
        if (metode === 'delivery' && !formData.get('alamat').trim()) {
            showToast('Alamat harus diisi untuk delivery', 'error');
            return;
        }

        // Validate phone number
        const phone = formData.get('nomorTelepon');
        if (phone.length < 10) {
            showToast('Nomor telepon tidak valid', 'error');
            return;
        }

        const orderData = {
            namaLengkap: formData.get('namaLengkap'),
            nomorTelepon: formData.get('nomorTelepon'),
            jumlahPesanan: parseInt(quantityInput.value),
            metodePengambilan: metode,
            alamat: metode === 'delivery' ? formData.get('alamat') : '',
            catatan: formData.get('catatan') || ''
        };

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Memproses...';

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                showToast('Pesanan berhasil! Terima kasih.', 'success');
                orderForm.reset();
                updateQuantity(1);
                deliveryOption.classList.add('active');
                pickupOption.classList.remove('active');
                alamatGroup.style.display = 'flex';
                pickupInfo.style.display = 'none';
            } else {
                const error = await response.json();
                showToast(error.message || 'Gagal memesan, coba lagi.', 'error');
            }
        } catch (error) {
            showToast('Terjadi kesalahan, coba lagi.', 'error');
            console.error('Order error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Konfirmasi Pesanan';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

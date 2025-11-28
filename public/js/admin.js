// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const totalOrdersDisplay = document.getElementById('totalOrders');
    const emptyState = document.getElementById('emptyState');
    const loadingState = document.getElementById('loadingState');
    const tableWrapper = document.getElementById('tableWrapper');
    const ordersTableBody = document.getElementById('ordersTableBody');
    const orderCards = document.getElementById('orderCards');

    let orders = [];

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Render table rows
    function renderTable(filteredOrders) {
        ordersTableBody.innerHTML = '';
        
        filteredOrders.forEach(function(order, index) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${escapeHtml(order.namaLengkap)}</strong></td>
                <td>${escapeHtml(order.nomorTelepon)}</td>
                <td>
                    <span class="badge-method ${order.metodePengambilan === 'delivery' ? 'badge-delivery' : 'badge-pickup'}">
                        ${order.metodePengambilan === 'delivery' ? 'Delivery' : 'Pickup'}
                    </span>
                </td>
                <td style="text-align: center;">${order.jumlahPesanan}</td>
                <td class="truncate">${escapeHtml(order.alamat) || '-'}</td>
                <td class="truncate">${escapeHtml(order.catatan) || '-'}</td>
                <td class="muted nowrap">${formatDate(order.waktuPesan)}</td>
            `;
            ordersTableBody.appendChild(row);
        });
    }

    // Render mobile cards
    function renderCards(filteredOrders) {
        orderCards.innerHTML = '';
        
        filteredOrders.forEach(function(order) {
            const card = document.createElement('div');
            card.className = 'order-card-item';
            card.innerHTML = `
                <div class="order-card-header">
                    <div>
                        <p class="order-card-name">${escapeHtml(order.namaLengkap)}</p>
                        <p class="order-card-phone">${escapeHtml(order.nomorTelepon)}</p>
                    </div>
                    <span class="badge-method ${order.metodePengambilan === 'delivery' ? 'badge-delivery' : 'badge-pickup'}">
                        ${order.metodePengambilan === 'delivery' ? 'Delivery' : 'Pickup'}
                    </span>
                </div>
                <div class="order-card-details">
                    <div class="order-card-detail">
                        <label>Jumlah</label>
                        <span>${order.jumlahPesanan} pcs</span>
                    </div>
                    <div class="order-card-detail">
                        <label>Waktu</label>
                        <span>${formatDate(order.waktuPesan)}</span>
                    </div>
                    ${order.alamat ? `
                    <div class="order-card-detail order-card-full">
                        <label>Alamat</label>
                        <span>${escapeHtml(order.alamat)}</span>
                    </div>
                    ` : ''}
                    ${order.catatan ? `
                    <div class="order-card-detail order-card-full">
                        <label>Catatan</label>
                        <span>${escapeHtml(order.catatan)}</span>
                    </div>
                    ` : ''}
                </div>
            `;
            orderCards.appendChild(card);
        });
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Filter orders
    function filterOrders(searchTerm) {
        const term = searchTerm.toLowerCase();
        return orders.filter(function(order) {
            return order.namaLengkap.toLowerCase().includes(term) ||
                   order.nomorTelepon.includes(term);
        });
    }

    // Update display
    function updateDisplay() {
        const searchTerm = searchInput.value;
        const filteredOrders = filterOrders(searchTerm);
        
        totalOrdersDisplay.textContent = orders.length;

        if (orders.length === 0) {
            emptyState.style.display = 'flex';
            tableWrapper.style.display = 'none';
            orderCards.innerHTML = '';
        } else if (filteredOrders.length === 0) {
            emptyState.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                </svg>
                <p>Tidak ada pesanan yang cocok</p>
            `;
            emptyState.style.display = 'flex';
            tableWrapper.style.display = 'none';
            orderCards.innerHTML = '';
        } else {
            emptyState.style.display = 'none';
            tableWrapper.style.display = 'block';
            renderTable(filteredOrders);
            renderCards(filteredOrders);
        }
    }

    // Fetch orders
    async function fetchOrders() {
        loadingState.style.display = 'flex';
        emptyState.style.display = 'none';
        tableWrapper.style.display = 'none';
        orderCards.innerHTML = '';
        refreshBtn.classList.add('spinning');

        try {
            const response = await fetch('/api/orders');
            if (response.ok) {
                orders = await response.json();
            } else {
                orders = [];
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            orders = [];
        } finally {
            loadingState.style.display = 'none';
            refreshBtn.classList.remove('spinning');
            updateDisplay();
        }
    }

    // Event listeners
    searchInput.addEventListener('input', updateDisplay);
    refreshBtn.addEventListener('click', fetchOrders);

    // Initial load
    fetchOrders();
});

const KEYS ={
    customers:'customers',
    customerId:'customerId'
}

export const getTemplateCollection = ()=>([
    { id: '1', title: 'Email FU 4' },
    { id: '2', title: 'Email FU 5' },
    { id: '3', title: 'Email FU 2' },
    { id: '4', title: 'Email FU 1' },
])

export function insertCustomer(data) {
    let customers=getAllcustomers();
    data['id'] = generateCustomerId()
    customers.push(data)
    localStorage.setItem(KEYS.customers,JSON.stringify(customers))
}

export function generateCustomerId() {
    if (localStorage.getItem(KEYS.customerId) == null)
        localStorage.setItem(KEYS.customerId, '0')
    var id = parseInt(localStorage.getItem(KEYS.customerId))
    localStorage.setItem(KEYS.customerId, (++id).toString())
    return id;
}

export function getAllcustomers() {
    if (localStorage.getItem(KEYS.customers) == null)
        localStorage.setItem(KEYS.customers, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.customers));
}
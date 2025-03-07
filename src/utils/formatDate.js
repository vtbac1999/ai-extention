export default function formatDate(date) {
    const newDate = new Date(date);

    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minute}`;
}
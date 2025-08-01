import { writeFileSync } from 'fs';
import axios from 'axios';

// Configuration
const BASE_URL = 'https://mployr.com/user/users/manage/list';
const PAGE_SIZE = 10;
const HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Access-Control-Allow-Origin': '*',
    'Connection': 'keep-alive',
    'Referer': 'https://mployr.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'subscription-key': '864f3eab5dd54ebebc75c06f48212793',
    'x-correlation-id': '61e567c2-2a92-4a17-9fea-ed6464fab5a8',
    'Cookie': 'cookiehub=eyJhbnN3ZXJlZCI6dHJ1ZSwicmV2aXNpb24iOjEsImRudCI6ZmFsc2UsImFsbG93U2FsZSI6dHJ1ZSwiaW1wbGljaXQiOmZhbHNlLCJyZWdpb24iOiIiLCJ0b2tlbiI6IiIsInRpbWVzdGFtcCI6IjIwMjUtMDQtMjRUMDY6NTQ6NDEuMjc1WiIsImFsbEFsbG93ZWQiOmZhbHNlLCJjYXRlZ29yaWVzIjpbXSwidmVuZG9ycyI6W10sInNlcnZpY2VzIjpbXSwiaW1wbGljaXQiOmZhbHNlfQ==; JWTSESSIONID=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtcGxveXItYWRtaW5AYWRtaW4uY29tIiwiYXV0aCI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV0sInVzZXJfaWQiOjI5MiwiaWF0IjoxNzU0MDQ0NzAxLCJpc3MiOiJtRW1wbG95ciIsImV4cCI6MTc1NDA2NjMwMX0.GQ89f6zOR8_EKAny3iG5DqAhwoA59I4PqDFeMNLj--s; TawkConnectionTime=0; twk_uuid_65d285cb8d261e1b5f62212b=%7B%22uuid%22%3A%221.1hHWg9Mxhvahbq7KDRnSCbYdJfdUDM2WZBdPaS6DXiiO1QNzDt4EHJjhlscMYzC2yQuNH3it4euyEqwItKSQwisvzhyPrbXu3Kul4ZeCKOyl82Y3Fzl%22%2C%22version%22%3A3%2C%22domain%22%3A%22mployr.com%22%2C%22ts%22%3A1754044722176%7D'
};

async function fetchAllUsers() {
    let allUsers = [];
    let currentPage = 0;
    let totalPages = 1; // Will be updated after first request
    
    try {
        while (currentPage < totalPages) {
            const url = `${BASE_URL}?page=${currentPage}&size=${PAGE_SIZE}`;
            console.log(`Fetching page ${currentPage + 1} of ${totalPages}...`);
            
            const response = await axios.get(url, { headers: HEADERS });
            const data = response.data;
            
            // Update total pages if this is the first request
            if (currentPage === 0) {
                totalPages = data.totalPages;
            }
            
            // Extract the fields we need
            const users = data.content.map(user => ({
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                status: user.status,
                role: user.role
            }));
            
            allUsers = allUsers.concat(users);
            currentPage++;
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        console.log(`Fetched ${allUsers.length} users in total.`);
        return allUsers;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
}

function exportToCSV(users) {
    const csvHeader = 'User ID,First Name,Last Name,Email,Phone,Status,Role\n';
    const csvRows = users.map(user => 
        `${user.userId},"${user.firstName}","${user.lastName}","${user.email}","${user.phone}",${user.status},${user.role}`
    ).join('\n');
    
    const csvContent = csvHeader + csvRows;
    const filename = `mployr_users_${new Date().toISOString().slice(0, 10)}.csv`;
    
    writeFileSync(filename, csvContent);
    console.log(`Data exported to ${filename}`);
}

(async () => {
    try {
        const users = await fetchAllUsers();
        exportToCSV(users);
    } catch (error) {
        console.error('Script failed:', error);
    }
})();
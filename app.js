// Jira API endpoint and credentials
const JIRA_BASE_URL = 'https://your-jira-instance.atlassian.net';
const JIRA_API_ENDPOINT = '/rest/api/2/search';
const JIRA_USERNAME = 'your-username';
const JIRA_API_TOKEN = 'your-api-token';

// Fetch issues from Jira
async function fetchJiraIssues() {
    const response = await fetch(`${JIRA_BASE_URL}${JIRA_API_ENDPOINT}?jql=status!=Closed`, {
        headers: {
            'Authorization': 'Basic ' + btoa(`${JIRA_USERNAME}:${JIRA_API_TOKEN}`),
            'Accept': 'application/json'
        }
    });
    const data = await response.json();
    return data.issues;
}

// Create a table based on Jira issues and label
function createTable(issues, label) {
    let tableHtml = `
        <h2>Issues for ${label}</h2>
        <table>
            <thead>
                <tr>
                    <th>Jira ID</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Requestor</th>
                    <th>Fix Version</th>
                    <th>Creator</th>
                </tr>
            </thead>
            <tbody>
    `;

    issues.forEach(issue => {
        tableHtml += `
            <tr>
                <td>${issue.key}</td>
                <td>${issue.fields.summary}</td>
                <td>${issue.fields.status.name}</td>
                <td>${issue.fields.reporter.displayName}</td>
                <td>${issue.fields.fixVersions.map(version => version.name).join(', ')}</td>
                <td>${issue.fields.creator.displayName}</td>
            </tr>
        `;
    });

    tableHtml += '</tbody></table>';

    return tableHtml;
}

// Main function to fetch issues and create tables
async function main() {
    const issues = await fetchJiraIssues();
    const labels = ['q1', 'q2', 'q3', 'q4'];

    labels.forEach(label => {
        const filteredIssues = issues.filter(issue => issue.fields.labels.includes(label));
        const tableHtml = createTable(filteredIssues, label);
        document.getElementById(`${label}-table`).innerHTML = tableHtml;
    });
}

main().catch(error => console.error('Error fetching Jira issues:', error));

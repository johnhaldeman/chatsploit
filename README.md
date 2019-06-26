# chatsploit
Chatsploit: A simple chat server used to demonstrate security problems in code

## OWASP Top 10
Chatsploit was developed specifically to help illustrate the issues discussed in the
Open Application Security Project (OWASP) Top 10 2017 security problems. The application
is used in conjunction with persentations on each of the security issues. The
presentations have been included in this repository as well:

1. [Injection](https://github.com/johnhaldeman/chatsploit/blob/master/Injection.pdf)
2. Broken Authentication (TODO)
3. Sensitive Data Exposure (TODO)
4. XML External Entities (XXE) (TODO)
5. Broken Access Control (TODO)
6. Security Misconfiguration (TODO)
7. Cross-Site Scripting (TODO)
8. Insecure Deserialization (TODO)
9. Using components with known vulnerabilities (TODO)
10. Insufficient Logging and Monitoring (TODO)

## Setting Up Your Own Chatsploit Server
**Please note:** Chatsploit is only used for demonstrations of security vulnerabilities. 
You shouldn't use the code for anything other than learning about those issues.

### Step 1: Install Node, dependancies, and chatsploit
- Download and install Node.js unless you have it already: https://nodejs.org/en/
- Clone the repository: git clone https://github.com/johnhaldeman/chatsploit.git
- Install javascript dependancies: ```npm install```
- Install MS SQL Server. SQL Express is free to use: https://www.microsoft.com/en-us/sql-server/sql-server-editions-express

### Step 2: Create a database
- Connect to your SQL Server instance, create a database and db login, then create the required tables:
```sql
CREATE TABLE dbo.users(
	username char(255),
	name char(255),
	email char(255),
	timejoined datetime
);

CREATE TABLE dbo.messages(
	from_user char(255),
	to_user char(255),
	message varchar(max),
	sent datetime NULL
);

```

### Step 3: Configure your Chatsploit instance to connect to the database
Provide the connection parameters to the SQL Server database you created by filling out the [config.js](https://github.com/johnhaldeman/chatsploit/blob/master/config.js) file.

### Step 4: Start the chatsploit server
Execute: ```npm start```

At this time, until we get to demonstrations about authentication, chatsploit uses very basic file authentication. The credentials for the application are located in [authdb/users.js](https://github.com/johnhaldeman/chatsploit/blob/master/authdb/users.js)



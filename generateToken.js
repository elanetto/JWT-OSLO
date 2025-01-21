import jwt from 'jsonwebtoken';

const SECRET = "shhh";
const token = jwt.sign(
	{
		email: "kontakt@anettetherese.no",
		username: "Anette",
		avatar: "www.anettetherese.no/avatar-01.png",
	},
	SECRET
);

console.log(token);
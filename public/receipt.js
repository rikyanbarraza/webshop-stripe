const sessionId = localStorage.getItem("session")
console.log(sessionId)



const verify = async () => {
try {
const sessionId = localStorage.getItem("session")

if (!sessionId) {
    throw new Error("No session Id can be verified")
}

const response = await fetch('/api/session/verify', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
        sessionId
    })
});
const { paid } = await response.json();
return paid;
} 
catch (err) {
    console.error(err)
    return false;
}
}

async function main() {
const isVerified = await verify()

}

main()

localStorage.removeItem("cart");
localStorage.removeItem("session");
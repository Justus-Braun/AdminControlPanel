import React, {useState} from 'react';
import auth from './../auth';



async function CheckUser(obj) {
    let fetchDomain = 'api/admins/all';
    const response = await fetch(fetchDomain);
    const data = await response.json();
    
    console.log("Domain: " + fetchDomain);
    console.log("response: " + response);
    console.log("Row: " + data);
    console.log("Index: " + data[0]);
    
    if (obj.name === "tom") {
        return true;
    }
    else {
        return false;
    }
    
}

export  const LoginForm =  props => {
    

    const [user, setUser] = useState({name: "", password: ""});


    const handleSubmit = (event) => {
        event.preventDefault();


        if (CheckUser(user)) {
            alert(`logged In: ${user.name}`);

            
            auth.login(() => {
                props.history.push("/home");
            });
            
        } else {
            alert(`Error: ${user.name}`);
        }

    }
    return (
        <>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter your name:
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                        />
                    </label>
                </div>
                <div>
                    <label>Enter your password:
                        <input
                            type="text"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                    </label>
                </div>
                <input type="submit"/>
            </form>

        </>

    )

}








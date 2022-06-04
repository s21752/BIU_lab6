import {useEffect, useState} from "react";

function UserInfo() {
    const [sendRequest, setSendRequest] = useState(true)
    const [user, setUser] = useState(
        {}
    )

    useEffect(() => {
        const fetchRandomUser = async () => {
            setSendRequest(false)
            const response = await fetch("https://randomuser.me/api/")
            const data = await response.json()
            logDataFetch(data)

            const userData = data.results[0]
            const nameData = userData.name

            setUser({...user,
                age: userData.dob.age,
                title: nameData.title,
                name: nameData.first,
                surname: nameData.last,
                pictureUrl: userData.picture.medium
            })
        }

        if (sendRequest)
            fetchRandomUser()
    }, [sendRequest])

    return <>
        <h2>User info</h2>
        <img style = {{
           width: "200px"
        }} src={user.pictureUrl}/>
        <h3>Name </h3><h5>{user.title} {user.name} {user.surname}</h5>
        <b/>
        <h3>Age </h3><h5>{user.age}</h5>
        <button onClick={ () => setSendRequest(true) }> Fetch new data
        </button>
    </>
}

function logDataFetch(dataJson) {
    console.log(`New data fetched ${dataJson}`)
}

export default UserInfo;
const ID_CLIENT = 'pSXeeXv7KFZr7Bqh';
let members = [];

function setScaleDrone(client, name, color) {
    return new ScaleDrone(client, {
        data: {
            name: name,
            color: color,
        },
    })
}

const drone = setScaleDrone(ID_CLIENT, getRandomName(), getRandomColor());

drone.on('open', error => {
    if (error) {
        return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');

    const room = drone.subscribe('observable-room');
    room.on('open', error => {
        if (error) {
            return console.error(error);
        }
        console.log('Successfully joined room');
    });

    room.on('members', m => {
        members = m;
        updateMember();
    });

    room.on('member_join', member => {
        members.push(member);
        updateMember();
    });

    room.on('member_leave', ({
        id
    }) => {
        const index = members.findIndex(member => member.id === id);
        members.splice(index, 1);
        updateMember();
    });

    room.on('data', (text, member) => {
        if (member) {
            addMessageToList(text, member);
        } else {
            // Message is from server
        }
    });
});

drone.on('close', event => {
    console.log('Connection was closed', event);
});

drone.on('error', error => {
    console.error(error);
});
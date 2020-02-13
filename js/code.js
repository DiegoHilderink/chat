const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
const names = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
const output = $('#output');
const ELEM = {
    membersCount: $('.members-count'),
    membersList: $('.members-list'),
    messages: $('.messages'),
    input: $('.message-form__input'),
    form: $('.message-form'),
};




ELEM.form.submit(() => {
    sendMessage()
})

function getRandomName() {
    return (
        adjs[Math.floor(Math.random() * adjs.length)] +
        "_" +
        names[Math.floor(Math.random() * names.length)]
    );
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function sendMessage() {
    var aux = ELEM.input.val();
    if (ELEM.input.val() !== '') {
        ELEM.input.val('');
        drone.publish({
            room: 'observable-room',
            message: aux,
        });
    }
}

function createMemberElement(member) {
    var { name,color } = member.clientData;
    var el = ELEM.membersList.append(`<p>`)
    el.text(name).css({ color: color })
    return el; 
}

function updateMember(){
    ELEM.membersCount.empty();
    ELEM.membersCount.append(`<p>${members.length} users in room:`);
    
    ELEM.membersList.empty();
    $.each(members, (i) => {
        ELEM.membersList.append(createMemberElement(members[i]));
    });
}

function createMessageElement(text, member) {
    var el = ELEM.messages
    var name = member.clientData.name;
    var color = member.clientData.color;
    var dt = new Date($.now())
    var currentTime = dt.getHours() 
                    + ":" + dt.getMinutes() 
                    + ":" + (dt.getSeconds() <= 9 ? '0'+dt.getSeconds() : dt.getSeconds());
                    
    el.append(`<div class='message'>${currentTime} <div class='member' style=color:${color}>${name}:</div>${text}`);
    return el;
}

function addMessageToList(text, member) {
    const el = ELEM.messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.append(createMessageElement(text, member));
    if (wasTop) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  }
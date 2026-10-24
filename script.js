document.getElementById("generateCard").addEventListener("click", function() {
    let name= document.getElementById("name").value.trim();
    let theme = document.getElementById("theme").value;

    if (name === "") {
        alert("Please Enter A Name: ");
        return;
    }

    let cardTitle= document.getElementById("cardTitle");
    let cardMessage = document.getElementById("cardMessage");
    let card = document.getElementById("card");

    //I am using emojis from the website emojipedia.org and emojidb.org

    let themeMessages={
        Birthday:`🎂Happy Birthday, ${name}! 🥳🎉Wishing you a fantastic day ahead, stay Happy, stay Safe, keep Improving and keep Enjoying your Life`,
        Congratulations:`🎉 Congratulations, ${name}!🏆 keep shining and achieving great things!`,
        Love:`❤️Dear ${name}, You are Truly Very special! sending love your way💝`,
        Friendship:`😎Hey ${name}!, You are an amazing friend! Stay awesome without you its hard to enjoy🌟.`,
        Diwali:`🪔✨Wishing you a Diwali filled with light, laughter, and love.🎇🎆`,
        Eid:`عيد مبارك🌙🤍Eid Mubarak! May this special day bring peace, happiness, and prosperity to your life⋆.˚ ☾⭒.˚.`,
        Chhath_Puja:`जय छठी मईया 🪔🌅🙏Happy Chhath Puja, As the Sun God rises, lets offer our prayers and seek his blessings🌞.`,
        Christmas:`🎄Merry Christmas, ☃️Gifts of time and 🦌🎅🏻Love are the basic ingredients of a truly 🧣Merry Christmas⊹ ࣪ ˖𓃴₊˚ ❆`,
        Marriage:`🤵🏻💍👰🏻Happy Marriage Life, A successful marriage requires falling in love many times, always with the same person𓍯𓂃𓏧♡.`,
    };
    cardTitle.innerText =`💌 ${theme.charAt(0).toUpperCase() + theme.slice(1)} Greeting`;
    cardMessage.innerText = themeMessages[theme];
    card.style.display = "block";
});

document.getElementById("downloadCard").addEventListener("click", function(){
        html2canvas(document.getElementById ("card")).then((canvas) => {
            let link = (document.createElement("a"));
            link.href = canvas.toDataURL("image/png");
            link.download = "greeting-card.png";
            link.click();
        });
    });
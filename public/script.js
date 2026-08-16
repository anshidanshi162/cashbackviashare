/*
|--------------------------------------------------------------------------
| SHARE & EARN
|--------------------------------------------------------------------------
|
| This version uses browser localStorage.
|
| It is suitable for a static website/demo.
|
| Real referral verification requires a backend/database.
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| CREATE USER REFERRAL ID
|--------------------------------------------------------------------------
*/

function generateReferralId() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = "";

    for (let i = 0; i < 6; i++) {

        result += characters.charAt(
            Math.floor(
                Math.random() *
                characters.length
            )
        );

    }

    return result;
}


/*
|--------------------------------------------------------------------------
| GET USER REFERRAL ID
|--------------------------------------------------------------------------
*/

function getReferralId() {

    let referralId =
        localStorage.getItem(
            "shareEarnReferralId"
        );


    if (!referralId) {

        referralId =
            generateReferralId();


        localStorage.setItem(
            "shareEarnReferralId",
            referralId
        );

    }


    return referralId;
}


/*
|--------------------------------------------------------------------------
| REFERRAL COUNT
|--------------------------------------------------------------------------
*/

function getReferralCount() {

    return parseInt(

        localStorage.getItem(
            "shareEarnReferralCount"
        ) || "0"

    );

}


/*
|--------------------------------------------------------------------------
| SET REFERRAL COUNT
|--------------------------------------------------------------------------
*/

function setReferralCount(count) {

    localStorage.setItem(

        "shareEarnReferralCount",

        count

    );

}


/*
|--------------------------------------------------------------------------
| GENERATE REFERRAL URL
|--------------------------------------------------------------------------
*/

function createReferralLink() {

    const referralId =
        getReferralId();


    const currentUrl =
        window.location.origin +
        window.location.pathname;


    return (
        currentUrl +
        "?ref=" +
        referralId
    );

}


/*
|--------------------------------------------------------------------------
| DISPLAY REFERRAL LINK
|--------------------------------------------------------------------------
*/

function displayReferralLink() {

    const input =
        document.getElementById(
            "referralLink"
        );


    if (!input) {
        return;
    }


    input.value =
        createReferralLink();

}


/*
|--------------------------------------------------------------------------
| COPY REFERRAL LINK
|--------------------------------------------------------------------------
*/

async function copyReferralLink() {

    const input =
        document.getElementById(
            "referralLink"
        );


    const link =
        input.value;


    try {

        await navigator.clipboard.writeText(
            link
        );


        showToast(
            "🎉 Referral link copied!"
        );


        const message =
            document.getElementById(
                "copyMessage"
            );


        message.style.display =
            "block";


        setTimeout(() => {

            message.style.display =
                "none";

        }, 2500);


    } catch (error) {

        /*
        Fallback for older browsers.
        */

        input.select();

        document.execCommand(
            "copy"
        );


        showToast(
            "🎉 Referral link copied!"
        );

    }

}


/*
|--------------------------------------------------------------------------
| WHATSAPP SHARE
|--------------------------------------------------------------------------
*/

function shareWhatsApp() {

    const link =
        createReferralLink();


    const message =
        `🎁 Join me and unlock rewards!

Use my referral link:

${link}`;


    const whatsappUrl =
        "https://wa.me/?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappUrl,
        "_blank"
    );

}


/*
|--------------------------------------------------------------------------
| NATIVE SHARE
|--------------------------------------------------------------------------
*/

async function nativeShare() {

    const link =
        createReferralLink();


    const shareData = {

        title:
            "Share & Earn",

        text:
            "Join me and unlock amazing rewards! 🎁",

        url:
            link

    };


    /*
    Mobile browsers often support
    the native share menu.
    */

    if (
        navigator.share
    ) {

        try {

            await navigator.share(
                shareData
            );

        } catch (error) {

            console.log(
                "Share cancelled."
            );

        }

    } else {

        copyReferralLink();

    }

}


/*
|--------------------------------------------------------------------------
| UPDATE DASHBOARD
|--------------------------------------------------------------------------
*/

function updateDashboard() {

    const count =
        getReferralCount();


    /*
    Points are calculated for
    demonstration purposes.
    */

    const points =
        count * 20;


    document
        .getElementById(
            "referralCount"
        )
        .innerText =
            count;


    document
        .getElementById(
            "points"
        )
        .innerText =
            points.toLocaleString();


    updateProgress(
        count
    );


    updateRewardCards(
        count
    );

}


/*
|--------------------------------------------------------------------------
| PROGRESS
|--------------------------------------------------------------------------
*/

function updateProgress(
    referralCount
) {

    /*
    First reward:
    5 referrals.
    */

    const required =
        5;


    const progress =
        Math.min(
            referralCount /
            required *
            100,
            100
        );


    document
        .getElementById(
            "progressFill"
        )
        .style.width =
            progress + "%";


    document
        .getElementById(
            "progressPercent"
        )
        .innerText =
            Math.round(
                progress
            ) + "%";


    document
        .getElementById(
            "progressText"
        )
        .innerText =
            `${Math.min(
                referralCount,
                required
            )} / ${required} referrals`;


    const nextReward =
        document.getElementById(
            "nextReward"
        );


    if (
        referralCount >= 25
    ) {

        nextReward.innerText =
            "🏆 You reached the Champion reward!";

    }

    else if (
        referralCount >= 10
    ) {

        nextReward.innerText =
            `🏆 Great! ${
                25 - referralCount
            } more referrals to reach Champion.`;

    }

    else if (
        referralCount >= 5
    ) {

        nextReward.innerText =
            `🎉 Starter Reward unlocked! ${
                10 - referralCount
            } more to reach Super Sharer.`;

    }

    else {

        nextReward.innerText =
            `Invite ${
                5 - referralCount
            } more friends to unlock your first reward.`;

    }

}


/*
|--------------------------------------------------------------------------
| REWARD CARDS
|--------------------------------------------------------------------------
*/

function updateRewardCards(
    referralCount
) {

    const cards =
        document.querySelectorAll(
            ".reward-card"
        );


    cards.forEach(card => {

        const required =
            parseInt(
                card.dataset.required
            );


        const lock =
            card.querySelector(
                ".locked"
            );


        if (
            referralCount >= required
        ) {

            card.classList.add(
                "unlocked"
            );


            lock.innerText =
                "✅";

        } else {

            card.classList.remove(
                "unlocked"
            );


            lock.innerText =
                "🔒";

        }

    });

}


/*
|--------------------------------------------------------------------------
| SCROLL TO INVITE
|--------------------------------------------------------------------------
*/

function scrollToInvite() {

    document
        .getElementById(
            "invite"
        )
        .scrollIntoView({

            behavior: "smooth"

        });

}


/*
|--------------------------------------------------------------------------
| SCROLL TO REWARDS
|--------------------------------------------------------------------------
*/

function scrollToRewards() {

    document
        .getElementById(
            "rewards"
        )
        .scrollIntoView({

            behavior: "smooth"

        });

}


/*
|--------------------------------------------------------------------------
| TOAST
|--------------------------------------------------------------------------
*/

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.innerText =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}


/*
|--------------------------------------------------------------------------
| DEMO REFERRAL DETECTION
|--------------------------------------------------------------------------
|
| If someone opens:
|
| ?ref=ABC123
|
| we display a welcome message.
|
| IMPORTANT:
| This does NOT securely register a referral.
|
|--------------------------------------------------------------------------
*/

function checkReferral() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const ref =
        params.get("ref");


    if (!ref) {
        return;
    }


    const ownReferralId =
        getReferralId();


    /*
    Prevent counting the user's
    own referral link.
    */

    if (
        ref === ownReferralId
    ) {

        return;

    }


    /*
    Demo only.
    */

    showToast(
        "🎁 Welcome! You joined through a referral."
    );

}


/*
|--------------------------------------------------------------------------
| INITIALIZE
|--------------------------------------------------------------------------
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        displayReferralLink();

        updateDashboard();

        checkReferral();

    }
);

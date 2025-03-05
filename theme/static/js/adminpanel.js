document.addEventListener('DOMContentLoaded', function(){


    function calculateDateDistance(targetDate) {
        const currentDate = new Date()
        const target = new Date(targetDate)
        target.setMonth(target.getMonth() + 1)

        const diffInMs = target - currentDate
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))

        return diffInDays
    }

    async function getData(url, apiKey)
    {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching data: ', error)
            throw error
        }
    }

    async function deleteMember(url, apiKey, email)
    {
        try {
            const response = await fetch(`${url}/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        } catch (error) {
            console.error('Error deleting data: ', error)
            throw error
        }
    }

    async function populatePreCancel()
    {
        const data = await getData('../members', '613d7984-a0ee-4558-b026-9882ac5a97a6')
        await insertHtmlPreCancel(data)
        await insertHtmlCanceled(data)
        await insertNumbers(data)
    }

    async function insertNumbers(data)
    {
        let activeCount = 0
        let preCanceledCount = 0
        let canceledCount = 0
        for (const member of data.members) {
            const daysLeft = calculateDateDistance(member.renewal_date)
            if (member.canceled && daysLeft >= 0) {
                preCanceledCount += 1
            } else if (member.canceled && daysLeft < 0 || member.failed_payment) {
                canceledCount += 1
            }  else if (!member.canceled && !member.failed_payment && daysLeft >= 0) {
                activeCount += 1
            }
        }

        const activeSubs = document.getElementById("activesubs")
        const preCanceledSubs = document.getElementById("precanceledsubs")
        const canceledSubs = document.getElementById("canceledsubs")

        activeSubs.textContent = activeCount
        preCanceledSubs.textContent = preCanceledCount
        canceledSubs.textContent = canceledCount
    }

    async function insertHtmlPreCancel(data)
    {
        const sortedMembers = data.members.sort((a, b) => {
            const dateA = new Date(a.renewal_date)
            const dateB = new Date(b.renewal_date)
        })
        const precancelContainer = document.getElementById("precanceled")
        precancelContainer.innerHTML = ''
        for (const member of sortedMembers) {
            const daysLeft = calculateDateDistance(member.renewal_date)
            if (member.canceled && daysLeft >= 0) {
                precancelContainer.innerHTML += `
                    <div id="${member.email}" class="flex justify-between bg-userContainer userborder rounded-lg p-2">
                        <div class="flex gap-4 w-80">
                            <img src="/static/img/@.svg" class="select-none h-6">
                            <span class="text-white text-base font-regular">${member.email}</span>
                        </div>
                        <div class="flex gap-4 w-48">
                            <img src="/static/img/status.svg" class="select-none h-6">
                            <span class="user-status text-gold text-base font-semibold">${daysLeft}d left</span>
                        </div>
                        <img src="/static/img/trash2.svg" class="h-6 select-none cursor-pointer pc-delete-btn">
                    </div>
                `
            }
        }

        const preCancelDelBtns = document.querySelectorAll('.pc-delete-btn')
        preCancelDelBtns.forEach(e => {
            e.addEventListener('click', function(){
                showPopUp()
                popUp(e)
            })
        })
    }
    async function insertHtmlCanceled(data)
    {
        const cancelContainer = document.getElementById("alrcanceled")
        cancelContainer.innerHTML = ''
        const sortedMembers = data.members.sort((a, b) => {
            const dateA = new Date(a.renewal_date)
            const dateB = new Date(b.renewal_date)
        })
        for (const member of sortedMembers) {
            const daysLeft = calculateDateDistance(member.renewal_date)
            let status = ''
            if (member.failed_payment) {
                status = 'Failed Payment'
            } else if (member.canceled && daysLeft < 0) {
                status = `${daysLeft}d ago`
            }
            if (member.canceled && daysLeft < 0 || member.failed_payment) {
                cancelContainer.innerHTML += `
                    <div id="${member.email}" class="flex justify-between bg-userContainer userborder rounded-lg p-2">
                        <div class="flex gap-4 w-80">
                            <img src="/static/img/@.svg" class="select-none h-6">
                            <span class="text-white text-base font-regular">${member.email}</span>
                        </div>
                        <div class="flex gap-4 w-80">
                            <img src="/static/img/status.svg" class="select-none h-6">
                            <span class="user-status text-mainRed text-base font-semibold">${status}</span>
                        </div>
                        <img src="/static/img/trash.svg" class="c-delete-btn h-6 select-none cursor-pointer">
                    </div>
                `
            }
        }

        const cancelDelBtns = document.querySelectorAll('.c-delete-btn')
        cancelDelBtns.forEach(e => {
            e.addEventListener('click', function(){
                showPopUp()
                popUp(e)
            })
        })
    }

    populatePreCancel()

    let boundFunction

    function popUp(element) {
        const user = element.parentElement
        const email = user.id

        const userStatus = user.querySelector('.user-status').textContent

        let color = ''
        let trashpath = ''
        if (element.classList.contains('pc-delete-btn')) {
            color = 'text-gold'
            trashpath = '/static/img/trash2.svg'
        } else if (element.classList.contains('c-delete-btn')) {
            color = 'text-mainRed'
            trashpath = '/static/img/trash.svg'
        }
        const popupSubmit = document.getElementById("popup-submit")
        boundFunction = deleteUser.bind(null, email)
        popupSubmit.addEventListener('click', boundFunction)
        
        const popupUserContainer = document.getElementById('pop-up-user-container')
        popupUserContainer.innerHTML = `
            <div class="flex justify-between bg-userContainer userborder rounded-lg p-2">
                <div class="flex gap-4 w-80">
                    <img src="/static/img/@.svg" class="select-none h-6">
                    <span id="popup-email" class="text-white text-base font-regular">${email}</span>
                </div>
                <div class="flex gap-4 w-80">
                    <img src="/static/img/status.svg" class="select-none h-6">
                    <span id="popup-status" class="${color} text-base font-semibold">${userStatus}</span>
                </div>
                <img src="${trashpath}" class="c-delete-btn h-6 select-none cursor-pointer">
            </div>
        `
    }

    // POPUP-CANCEL LISTENER
    const popupCancel = document.getElementById("popup-cancel")
    popupCancel.addEventListener('click', function(){
        const popup = document.getElementById("popup")
        const overlay = document.getElementById("overlay")
        popup.classList.add('opacity-0')
        popup.classList.add('pointer-events-none')
        overlay.classList.add('opacity-0')
    })

    function showPopUp()
    {
        const popup = document.getElementById("popup")
        const popupSubmit = document.getElementById("popup-submit")
        const overlay = document.getElementById("overlay")

        popup.classList.remove('opacity-0')
        popup.classList.remove('pointer-events-none')
        overlay.classList.remove('opacity-0')
        
        popupSubmit.removeEventListener('click', boundFunction)
    }

    async function deleteUser(email)
    {
        try {
            await deleteMember('../members/delete', '613d7984-a0ee-4558-b026-9882ac5a97a6', email)
            populatePreCancel()
        } catch (error) {
            console.error('Error performing: ', error)
        }
        
        
        // HIDING POPUP
        const popup = document.getElementById("popup")
        const overlay = document.getElementById("overlay")
        popup.classList.add('opacity-0')
        popup.classList.add('pointer-events-none')
        overlay.classList.add('opacity-0')
    }

    //prices and variables
    async function fetchPricesAndVariables() {
        const data = await getData('../globals/', '613d7984-a0ee-4558-b026-9882ac5a97a6')
        
        const courses = data.globals.coursesCount
        const users = data.globals.userCount
        const oneMonth = data.globals.oneMonth
        const threeMonth = data.globals.threeMonth
        const twelveMonth = data.globals.twelveMonth
        const vslUrl = data.globals.vslURL
        const stripeUrl = data.globals.stripeURL

        document.getElementById('coursesCount').value = courses
        document.getElementById('membersCount').value = users
        document.getElementById('1moPrice').value = oneMonth
        document.getElementById('3moPrice').value = threeMonth
        document.getElementById('12moPrice').value = twelveMonth
        document.getElementById('vslUrl').value = vslUrl
        document.getElementById('stripeUrl').value = stripeUrl
    }

    fetchPricesAndVariables()

    async function patchGlobals(updatedData, apiKey) {
        try {
            const response = await fetch('/globals/update/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                },
                body: JSON.stringify(updatedData)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            setTimeout(() => {
                window.location.reload()
            }, 500);

        } catch (error) {
            console.error('Error fetching data: ', error)
            throw error
        }
    }

    const updatebtn = document.getElementById('saveGlobals')
    updatebtn.addEventListener('click', async function(){
        await patchGlobals({
            'one_month_price': document.getElementById('1moPrice').value,
            'three_month_price': document.getElementById('3moPrice').value,
            'twelve_month_price': document.getElementById('12moPrice').value,
            'user_count': document.getElementById('membersCount').value,
            'courses_count': document.getElementById('coursesCount').value,
            'vsl_url': document.getElementById('vslUrl').value,
            'stripe_url': document.getElementById('stripeUrl').value
        }, '613d7984-a0ee-4558-b026-9882ac5a97a6')
    })
})
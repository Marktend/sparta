document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
        // Redirect to /books
        window.location.href = '/';
    } else {
        // Handle failed login (optional)
        alert('Login failed. Please try again.');
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const logoutForm = document.getElementById('logoutForm');
    if (logoutForm) {
        logoutForm.addEventListener('submit', function(event) {
            event.preventDefault();
            fetch(this.action, {
                method: 'POST',
                body: new URLSearchParams(new FormData(this))
            })
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Logout failed');
                }
            })
            .then(function(data) {
                const redirectUrl = data.redirect || '/';
                window.location.href = redirectUrl;
            })
            .catch(function(error) {
                console.error('Logout error:', error);
            });
        });
    } else {
        console.error('Element with ID "logoutForm" not found.');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const nickname = document.getElementById('signup-nickname').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const phone_number = document.getElementById('signup-phone_number').value;

            const userData = {
                nickname: nickname,
                email: email,
                password: password,
                phone_number: phone_number
            };

            try {
                const response = await fetch('/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                const result = await response.json();
                if (response.ok) {

                    $('#createAccountModal').modal('hide');

                    alert('사용자 등록 성공');
                    // 회원가입 성공 후 추가 작업을 수행할 수 있습니다.
                    // 예를 들어, 다른 페이지로 리디렉션하거나 필요한 동작을 수행할 수 있습니다.
                } else {
                    alert('사용자 등록 실패: ' + result.error);
                }
            } catch (error) {
                console.error('오류:', error);
                alert('사용자 등록 실패');
            }
        });
    } else {
        console.error('ID가 "registrationForm"인 요소를 찾을 수 없습니다.');
    }
});



document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/api/book');
    const data = await response.json();
    const books = data.books;

    const booksContainer = document.querySelector('.row.row-cols-1.row-cols-md-4.g-4.mx-auto.w-75.pb-5');

    if (books.length > 0) {
        booksContainer.innerHTML = ''; // Clear existing content

        books.forEach(book => {
            const bookCard = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${book.img_url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.author}</p>
                            <p class="card-text">${book.book_info}</p>
                        </div>
                    </div>
                </div>
            `;
            booksContainer.innerHTML += bookCard;
        });
    }

});



document.getElementById('bookForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const book_info = document.getElementById('book_info').value;
        const subject = document.getElementById('subject').value;
        const img_url = document.getElementById('img_url').value;

        const bookData = {
            title: title,
            author: author,
            book_info: book_info,
            subject: subject,
            img_url: img_url
        };

        try {
            const response = await fetch('/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });

            const result = await response.json();
            if (response.ok) {
                $('#createBookModal').modal('hide');

                alert('책이 성공적으로 추가되었습니다.');

            } else {
                alert('책 추가 중 오류가 발생했습니다: ' + result.error);
            }
        } catch (error) {
            console.error('오류:', error);
            alert('책 추가 중 오류가 발생했습니다.');
        }
    });


document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nickname = document.getElementById('signup-nickname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone_number = document.getElementById('signup-phone_number').value;

    console.log('Nickname:', nickname);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Phone Number:', phone_number);

    const userData = {
        nickname: nickname,
        email: email,
        password: password,
        phone_number: phone_number
    };

    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        if (response.ok) {
            alert('사용자 등록 성공');
            // 다른 페이지로 리디렉션하거나 필요한 추가 작업 수행
        } else {
            alert('사용자 등록 실패: ' + result.error);
        }
    } catch (error) {
        console.error('오류:', error);
        alert('사용자 등록 실패');
    }
});



document.getElementById('user-info-update-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nickname = document.getElementById('update-nickname').value;
    const email = document.getElementById('update-email').value;
    const password = document.getElementById('update-password').value;
    const phone_number = document.getElementById('update-phone_number').value;

    const current_user_id = document.getElementById('update-current-user-id').value;

    console.log('current_user_id:', current_user_id);

    const userData = {
        nickname: nickname,
        email: email,
        password: password,
        phone_number: phone_number
    };

    try {
        const response = await fetch(`/api/user/${current_user_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        if (response.ok) {
            alert('사용자 정보가 성공적으로 변경되었습니다.');
            // 변경 성공 후 추가적인 작업을 할 수 있습니다.
        } else {
            alert('사용자 정보 변경 실패: ' + result.error);
        }
    } catch (error) {
        console.error('오류:', error);
        alert('사용자 정보 변경 실패');
    }
});



$(document).ready(function() {
    $('#searchForm').submit(async function(event) {
        event.preventDefault();

        const searchQuery = $('#searchInput').val().trim();

        console.log(searchQuery)

        try {
            const response = await fetch('/api/book/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: searchQuery })
            });

            if (!response.ok) {
                throw new Error('검색 결과를 가져오지 못했습니다');
            }

            const books = await response.json();
            displaySearchResults(books);

        } catch (error) {
            console.error('검색 결과 가져오기 오류:', error);
            alert('검색 결과를 가져오는 데 실패했습니다. 다시 시도해 주세요.');
        }
    });

    function displaySearchResults(books) {
        const searchResultsContainer = $('#searchResults');
        searchResultsContainer.empty();

        if (books.length === 0) {
            searchResultsContainer.append('<p>검색된 책이 없습니다</p>');
            return;
        }

        books.forEach(book => {
            const card = `
                <div class="col mb-4">
                    <div class="card h-100">
                        <img src="${book.img_url}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.author}</p>
                            <p class="card-text">${book.book_info}</p>
                        </div>
                    </div>
                </div>
            `;
            searchResultsContainer.append(card);
        });
    }
});



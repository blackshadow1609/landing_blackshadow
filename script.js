// 1. ОТПРАВКА ФОРМЫ ЧЕРЕЗ FORMSPREE

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.feedback-form');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Состояние загрузки
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Успешно
                    this.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px;">
                            <i class="fas fa-check-circle" style="font-size: 4rem; color: #7c3aed; margin-bottom: 20px;"></i>
                            <h3 style="color: #fff; font-size: 1.8rem;">\u0421\u043F\u0430\u0441\u0438\u0431\u043E!</h3>
                            <p style="color: #c4b5d4; font-size: 1.2rem;">\u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430. \u042F \u0441\u0432\u044F\u0436\u0443\u0441\u044C \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F.</p>
                            <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 30px; background: linear-gradient(135deg, #7c3aed, #6d28d9); border: none; border-radius: 12px; color: #fff; font-weight: 700; cursor: pointer; font-size: 1rem; transition: 0.3s;">
                                <i class="fas fa-arrow-left"></i> \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0435\u0449\u0451 \u043E\u0434\u043D\u0443 \u0437\u0430\u044F\u0432\u043A\u0443
                            </button>
                        </div>
                    `;
                } else {
                    alert('\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043C\u043D\u0435 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u043D\u0430 \u043F\u043E\u0447\u0442\u0443.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert('\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});


// 2. АНИМАЦИЯ КАРТОЧЕК ПРИ СКРОЛЛЕ

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.service-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => observer.observe(card));
    } else {
        // Fallback для старых браузеров
        cards.forEach(card => card.classList.add('visible'));
    }
});


// 3. АНИМАЦИЯ СЧЁТЧИКА СТАТИСТИКИ

document.addEventListener('DOMContentLoaded', function () {
    const statNumbers = document.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window) {
        const animateCounter = (el) => {
            const target = parseFloat(el.dataset.target);
            const duration = 2000;
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeOutQuad = 1 - Math.pow(1 - progress, 2);
                const current = target * easeOutQuad;

                if (target % 1 === 0) {
                    el.textContent = Math.round(current);
                } else {
                    el.textContent = current.toFixed(1);
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            };

            requestAnimationFrame(update);
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    animateCounter(el);
                    statObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => statObserver.observe(num));
    } else {

        statNumbers.forEach(num => {
            num.textContent = num.dataset.target;
        });
    }
});


// 4. КНОПКА «НАВЕРХ»

document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.getElementById('scrollTop');

    if (scrollBtn) {
        // Показать/скрыть кнопку
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });

        // Плавный скролл наверх
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});


// 5. ПЛАВНАЯ ЗАГРУЗКА СТРАНИЦЫ

document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


// 6. МАСКА ДЛЯ ТЕЛЕФОНА

document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');

            if (value.length > 0) {
                // Форматирование как +7 (999) 123-45-67
                let formatted = '';

                if (value.length <= 1) {
                    formatted = '+' + value;
                } else if (value.length <= 4) {
                    formatted = '+' + value.slice(0, 1) + ' (' + value.slice(1);
                } else if (value.length <= 7) {
                    formatted = '+' + value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + value.slice(4);
                } else if (value.length <= 9) {
                    formatted = '+' + value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7);
                } else {
                    formatted = '+' + value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
                }

                this.value = formatted;
            }
        });
    }
});


// 7. КОНСОЛЬНОЕ ПРИВЕТСТВИЕ (для разработчиков)

console.log('%c BlackShadow ', 'background: #7c3aed; color: #fff; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c \u0414\u0438\u0437\u0430\u0439\u043D \u00B7 \u0420\u0435\u0442\u0443\u0448\u044C \u00B7 \u0412\u0451\u0440\u0441\u0442\u043A\u0430 ', 'color: #a78bfa; font-size: 14px;');
console.log('%c \u2709\uFE0F blackshadow1609@yandex.ru ', 'color: #60a5fa; font-size: 12px;');
console.log('%c \u260E\uFE0F +7-995-627-15-97 ', 'color: #60a5fa; font-size: 12px;');


// 8. ЗАЩИТА ОТ БОТОВ 
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.feedback-form');

    if (form) {
        // Скрытое поле-ловушка
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = '_gotcha';
        honeypot.style.display = 'none';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        form.appendChild(honeypot);
    }
});


// 9. СОХРАНЕНИЕ ДАННЫХ ФОРМЫ
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.feedback-form');

    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');

        // Восстанавление данных при загрузке
        inputs.forEach(input => {
            const saved = localStorage.getItem('form_' + input.id);
            if (saved && input.type !== 'password') {
                input.value = saved;
            }
        });

        // Сохранение данных при вводе
        inputs.forEach(input => {
            input.addEventListener('input', function () {
                if (this.id) {
                    localStorage.setItem('form_' + this.id, this.value);
                }
            });
        });

        // Очистка после успешной отправки
        form.addEventListener('submit', function () {
            inputs.forEach(input => {
                if (input.id) {
                    localStorage.removeItem('form_' + input.id);
                }
            });
        });
    }
});


// 10. КОПИРОВАНИЕ КОНТАКТОВ (опционально)
document.addEventListener('DOMContentLoaded', function () {
    const contacts = document.querySelectorAll('.contacts a');

    contacts.forEach(link => {
        link.addEventListener('click', function (e) {
            // Ссылка на почту или телефон
            if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
                return;
            }
        });
    });
});


// 11. ОБНАРУЖЕНИЕ ПОДКЛЮЧЕНИЯ К ИНТЕРНЕТУ
window.addEventListener('online', function () {
    console.log('\u2705 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0451\u043D');
    const status = document.createElement('div');
    status.style.cssText = `
        position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%);
        background: #10b981; color: #fff; padding: 8px 20px; border-radius: 10px;
        font-size: 14px; z-index: 9999; animation: fadeIn 0.3s ease;
    `;
    status.textContent = '\u2705 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D';
    document.body.appendChild(status);
    setTimeout(() => status.remove(), 3000);
});

window.addEventListener('offline', function () {
    console.log('\u274C \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u043E\u0442\u043A\u043B\u044E\u0447\u0451\u043D');
    const status = document.createElement('div');
    status.style.cssText = `
        position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%);
        background: #ef4444; color: #fff; padding: 8px 20px; border-radius: 10px;
        font-size: 14px; z-index: 9999; animation: fadeIn 0.3s ease;
    `;
    status.textContent = '\u274C \u041D\u0435\u0442 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435.';
    document.body.appendChild(status);
    setTimeout(() => status.remove(), 4000);
});
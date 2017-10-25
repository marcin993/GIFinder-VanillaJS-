/*!
GIFinder (VanillaJS)
Version: 1.0
Author: Marcin Lasecki (marcin.1993@poczta.pl)
License: MIT
*/

var GIFinder = ({
    confirmChanges: function(input, status) {
        var input = input;

        function setBorderInput(input, cssClass) {
            input.classList.add(cssClass);

            setTimeout(function() {
                input.classList.remove(cssClass);
            }, 2500);
        }

        if(status === "ok") {
            setBorderInput(input, "border-success");
        }
        else if (status === "error") {
            setBorderInput(input, "border-failed");
        }
    },

    restoreDefaultSettings: function() {
        var settings = ["appColor", "resultNumber", "searchLanguage", "sizeUnit", "startTag"]
        for(var i = 0; i < settings.length; i++) {
            localStorage.removeItem(settings[i]);
        }
        this.printMessage("<span class=\"bold\">Przywrócono domyślne ustawienia!</span><br> Pełne zmiany będą widoczne po restarcie aplikacji.", "success");
    },

    validateColors: function(val) {
        var pat1 = /^#[abcdef\d]{3}/i;
        var pat2 = /^#[abcdef\d]{6}/i;
        var pat3 = /^rgba?\(\d{1,3}\, ?\d{1,3}\, ?\d{1,3}\,? ?\.?\d{0,4}\)/i;
    },

    setAppColors: function() {
        this.colorInput = document.getElementById("appColor");
        this.appColor = this.colorInput.value;

        if(localStorage.getItem("appColor")) {
            this.appColor = localStorage.getItem("appColor");
            this.colorInput.value = localStorage.getItem("appColor");
        }

        this.colorInput.addEventListener("change", function(e) {
            var val = e.target.value;

            this.saveItemToLS("appColor", val);
            this.confirmChanges(e.target, "ok");
            this.init();
        }.bind(this));


        var elemsToPaint = [document.querySelector("header"), document.querySelector("footer"), document.querySelector("nav")];

        for(var i = 0; i < elemsToPaint.length; i++) {
            elemsToPaint[i].style.backgroundColor = this.appColor;
        }
    },

    selectOptionList: function(list, val) {
        for(var i = 0; i < list.length; i++) {
            if(list[i].textContent === val) {
                list[i].setAttribute("selected", "selected");
            }
        }
    },

    //Ustawianie jednostki rozmiaru gifów
    setSearchLanguage: function() {
        this.searchLanguageInput = document.getElementById("searchLanguage");
        this.searchLanguage = "";

        function serviceLanguage(code) {
            this.searchLanguage = code
            this.saveItemToLS("searchLanguage", code);
            this.serviceRequest({
                q: this.q,
                count: this.count,
                offset: this.offset,
                lang: this.searchLanguage
            });
        }

        if(localStorage.getItem("searchLanguage")) {
            this.searchLanguage = localStorage.getItem("searchLanguage");

            switch(this.searchLanguage) {
                case "ar":
                    this.selectOptionList(this.searchLanguageInput, "Arabski");
                    break;
                case "bn":
                    this.selectOptionList(this.searchLanguageInput, "Bengalski");
                    break;
                case "zh-CN":
                    this.selectOptionList(this.searchLanguageInput, "Chiński (tradycyjny)");
                    break;
                case "zh-TW":
                    this.selectOptionList(this.searchLanguageInput, "Chiński (uproszczony)");
                    break;
                case "cs":
                    this.selectOptionList(this.searchLanguageInput, "Czeski");
                    break;
                case "da":
                    this.selectOptionList(this.searchLanguageInput, "Duński");
                    break;
                case "tl":
                    this.selectOptionList(this.searchLanguageInput, "Filipiński");
                    break;
                case "fi":
                    this.selectOptionList(this.searchLanguageInput, "Fiński");
                    break;
                case "fr":
                    this.selectOptionList(this.searchLanguageInput, "Francuski");
                    break;
                case "iw":
                    this.selectOptionList(this.searchLanguageInput, "Hebrajski");
                    break;
                case "hi":
                    this.selectOptionList(this.searchLanguageInput, "Hindi");
                    break;
                case "es":
                    this.selectOptionList(this.searchLanguageInput, "Hiszpański");
                    break;
                case "id":
                    this.selectOptionList(this.searchLanguageInput, "Indonezyjski");
                    break;
                case "ja":
                    this.selectOptionList(this.searchLanguageInput, "Japoński");
                    break;
                case "ko":
                    this.selectOptionList(this.searchLanguageInput, "Koreański");
                    break;
                case "ms":
                    this.selectOptionList(this.searchLanguageInput, "Malajski");
                    break;
                case "nl":
                    this.selectOptionList(this.searchLanguageInput, "Niderlandzki");
                    break;
                case "de":
                    this.selectOptionList(this.searchLanguageInput, "Niemiecki");
                    break;
                case "no":
                    this.selectOptionList(this.searchLanguageInput, "Norweski");
                    break;
                case "fa":
                    this.selectOptionList(this.searchLanguageInput, "Perski");
                    break;
                case "pl":
                    this.selectOptionList(this.searchLanguageInput, "Polski");
                    break;
                case "pt":
                    this.selectOptionList(this.searchLanguageInput, "Portugalski");
                    break;
                case "ru":
                    this.selectOptionList(this.searchLanguageInput, "Rosyjski");
                    break;
                case "ro":
                    this.selectOptionList(this.searchLanguageInput, "Rumuński");
                    break;
                case "sv":
                    this.selectOptionList(this.searchLanguageInput, "Szwedzki");
                    break;
                case "th":
                    this.selectOptionList(this.searchLanguageInput, "Tajski");
                    break;
                case "tr":
                    this.selectOptionList(this.searchLanguageInput, "Turecki");
                    break;
                case "uk":
                    this.selectOptionList(this.searchLanguageInput, "Ukraiński");
                    break;
                case "hu":
                    this.selectOptionList(this.searchLanguageInput, "Węgierski");
                    break;
                case "vi":
                    this.selectOptionList(this.searchLanguageInput, "Wietnamski");
                    break;
                case "it":
                    this.selectOptionList(this.searchLanguageInput, "Włoski");
                    break;
                default:
                    this.selectOptionList(this.searchLanguageInput, "Brak");
            }
        }

        this.searchLanguageInput.addEventListener("change", function() {
            switch(this.searchLanguageInput.value) {
                case "Arabski":
                    serviceLanguage.call(this, "ar");
                    break;
                case "Bengalski":
                    serviceLanguage.call(this, "bn");
                    break;
                case "Chiński (tradycyjny)":
                    serviceLanguage.call(this, "zh-CN");
                    break;
                case "Chiński (uproszczony)":
                    serviceLanguage.call(this, "zh-TW");
                    break;
                case "Czeski":
                    serviceLanguage.call(this, "cs");
                    break;
                case "Duński":
                    serviceLanguage.call(this, "da");
                    break;
                case "Filipiński":
                    serviceLanguage.call(this, "tl");
                    break;
                case "Fiński":
                    serviceLanguage.call(this, "fi");
                    break;
                case "Francuski":
                    serviceLanguage.call(this, "fr");
                    break;
                case "Hebrajski":
                    serviceLanguage.call(this, "iw");
                    break;
                case "Hindi":
                    serviceLanguage.call(this, "hi");
                    break;
                case "Hiszpański":
                    serviceLanguage.call(this, "es");
                    break;
                case "Indonezyjski":
                    serviceLanguage.call(this, "id");
                    break;
                case "Japoński":
                    serviceLanguage.call(this, "ja");
                    break;
                case "Koreański":
                    serviceLanguage.call(this, "ko");
                    break;
                case "Malajski":
                    serviceLanguage.call(this, "ms");
                    break;
                case "Niderlandzki":
                    serviceLanguage.call(this, "nl");
                    break;
                case "Niemiecki":
                    serviceLanguage.call(this, "de");
                    break;
                case "Norweski":
                    serviceLanguage.call(this, "no");
                    break;
                case "Perski":
                    serviceLanguage.call(this, "fa");
                    break;
                case "Polski":
                    serviceLanguage.call(this, "pl");
                    break;
                case "Portugalski":
                    serviceLanguage.call(this, "pt");
                    break;
                case "Rosyjski":
                    serviceLanguage.call(this, "ru");
                    break;
                case "Rumuński":
                    serviceLanguage.call(this, "ro");
                    break;
                case "Szwedzki":
                    serviceLanguage.call(this, "sv");
                    break;
                case "Tajski":
                    serviceLanguage.call(this, "th");
                    break;
                case "Turecki":
                    serviceLanguage.call(this, "tr");
                    break;
                case "Ukraiński":
                    serviceLanguage.call(this, "uk");
                    break;
                case "Węgierski":
                    serviceLanguage.call(this, "hu");
                    break;
                case "Wietnamski":
                    serviceLanguage.call(this, "vi");
                    break;
                case "Włoski":
                    serviceLanguage.call(this, "it");
                    break;
                default:
                    serviceLanguage.call(this, "");
                    break;
            }
        }.bind(this));

    },

    setSizeUnit: function() {
        this.sizeUnitInput = document.getElementById("sizeUnit");
        this.sizeUnit = this.sizeUnitInput[1].textContent;

        if(localStorage.getItem("sizeUnit")) {
            for(var i = 0; i < this.sizeUnitInput.length; i++) {
                if(this.sizeUnitInput[i].textContent === localStorage.getItem("sizeUnit")) {
                    this.sizeUnitInput[i].setAttribute("selected", "selected");
                    this.sizeUnit = localStorage.getItem("sizeUnit");
                }
            }
        }

        this.sizeUnitInput.addEventListener("click", function(e) {
            var val = e.target.value;

            function changeSizeUnit(unit) {
                localStorage.setItem("sizeUnit", unit);
                this.sizeUnit = unit;
                this.serviceRequest({
                    q: this.q,
                    count: this.count,
                    offset: this.offset,
                    lang: this.searchLanguage
                });
            }

            if(val === "KB") {
                changeSizeUnit.call(this, "KB");
            }
            else if (val === "MB") {
                changeSizeUnit.call(this, "MB");
            }
            else {
                this.printMessage("Wybrano nieznaną jednostkę!", "error");
            }
        }.bind(this));
    },

    setStartTag: function() {
        this.startTagInput = document.getElementById("startTag");

        if(localStorage.getItem("startTag")) {
            this.startTagInput.value = localStorage.getItem("startTag");
            this.searchInput.value = localStorage.getItem("startTag");
        }

        this.startTagInput.addEventListener("keyup", function(e) {
            if(e.keyCode === 13) {
                var val = e.target.value;
                localStorage.setItem("startTag", val);
                this.searchInput.value = e.target.value;
                this.confirmChanges(e.target, "ok");
                this.q = val;
                this.serviceRequest({
                    q: this.q,
                    count: this.count,
                    offset: 0,
                    lang: this.searchLanguage
                });
            }
        }.bind(this))
    },

    setResultsNumber: function() {
        this.resultsNumberInput = document.getElementById("resultsNumber");

        if(localStorage.getItem("resultNumber")) {
            this.resultsNumberInput.value = localStorage.getItem("resultNumber");
        }

        this.resultsNumberInput.addEventListener("keyup", function(e) {
            if(e.keyCode === 13) {
                var val = parseInt(e.target.value);
                if(!isNaN(val)) {
                    localStorage.setItem("resultNumber", val);
                    this.count = val;
                    this.confirmChanges(e.target, "ok");
                    this.serviceRequest({
                        q: this.q,
                        count: this.count,
                        offset: 0,
                        lang: this.searchLanguage
                    });
                } else {
                    this.confirmChanges(e.target, "error");
                    this.printMessage("Proszę podać prawidłową liczbę!", "error");
                }
            }
        }.bind(this))
    },

    //Blokowanie nawigacji jeśli nie ma dalej lub wcześniej wyników
    controlResultOverflow: function() {
        if(this.resPagination.count + this.resPagination.offset >= this.resPagination.total_count) {
            document.getElementById("nextBtn").disabled = true;
        }

        if(this.resPagination.offset === 0) {
            document.getElementById("prevBtn").disabled = true;
        }
    },

    nextPage: function(e) {
        this.offset += this.count;
        this.serviceRequest({
            q: this.q,
            count: this.count,
            offset: this.offset,
            lang: this.searchLanguage
        });
    },

    prevPage: function(e) {
        this.offset -= this.count;
        this.serviceRequest({
            q: this.q,
            count: this.count,
            offset: this.offset,
            lang: this.searchLanguage
        });
    },

    buildPagination: function(pag, div) {
        var pag = parseInt(pag),
            p = document.createElement("p"),
            prevBtn = document.createElement("button"),
            nextBtn = document.createElement("button"),
            prevI = document.createElement("i"),
            nextI = document.createElement("i"),
            span = document.createElement("span");

        prevI.setAttribute("class", "fa-arrow-left");
        nextI.setAttribute("class", "fa-arrow-right");

        prevBtn.appendChild(prevI);
        nextBtn.appendChild(nextI);

        p.setAttribute("class", "nav-results");
        prevBtn.setAttribute("class", "nav-btn");
        nextBtn.setAttribute("class", "nav-btn");
        prevBtn.setAttribute("id", "prevBtn");
        nextBtn.setAttribute("id", "nextBtn");

        //Ewentualne ustawienie kolorów zdefiniowanych przez użytkownika
        if(this.appColor !== "") {
            prevBtn.style.backgroundColor = this.appColor;
            nextBtn.style.backgroundColor = this.appColor;
        }

        prevBtn.addEventListener("click", this.prevPage.bind(this));
        nextBtn.addEventListener("click", this.nextPage.bind(this));

        p.appendChild(prevBtn);
        p.appendChild(span);
        p.appendChild(nextBtn);
        div.appendChild(p);

        this.controlResultOverflow();
    },

    openGif: function(url, directLink, giphyLink) {
        var divPlay = document.createElement("div"),
            closeBtn = document.createElement("i"),
            gifPlayer = document.createElement("video"),
            divShare = document.createElement("div"),
            labelDirectLink = document.createElement("label"),
            inputDirectLink = document.createElement("input"),
            pDivShare = document.createElement("p"),
            aOpenGiphy = document.createElement("a");

        divPlay.setAttribute("class", "play flex");
        closeBtn.setAttribute("class", "fa-times");
        closeBtn.setAttribute("aria-hidden", "true");
        gifPlayer.setAttribute("class", "gif");
        gifPlayer.setAttribute("src", url);
        gifPlayer.setAttribute("autoplay", "autoplay");
        gifPlayer.setAttribute("loop", "loop");
        divShare.setAttribute("class", "share");
        labelDirectLink.setAttribute("for", "directLink");
        labelDirectLink.textContent = "Skopiuj link:";
        inputDirectLink.setAttribute("class", "form-control");
        inputDirectLink.setAttribute("type", "url");
        inputDirectLink.setAttribute("value", directLink);
        pDivShare.textContent = "lub";
        aOpenGiphy.setAttribute("class", "open-giphy");
        aOpenGiphy.setAttribute("href", giphyLink);
        aOpenGiphy.setAttribute("target", "blank");
        aOpenGiphy.textContent = "Otwórz w Giphy.com";

        divShare.appendChild(labelDirectLink);
        divShare.appendChild(inputDirectLink);
        divShare.appendChild(pDivShare);
        divShare.appendChild(aOpenGiphy);

        closeBtn.addEventListener("click", function(e) {
            document.body.removeChild(divPlay);
        });

        divPlay.appendChild(closeBtn);
        divPlay.appendChild(gifPlayer);
        divPlay.appendChild(divShare);
        document.body.appendChild(divPlay);
    },

    convertSize: function(size, unit) {
        if(unit === "KB") {
            return parseInt(size / 1000) + " KB";
        }
        else if (unit === "MB") {
            return parseFloat(size / 1000000).toFixed(2) + " MB";
        }
        else {
            this.printMessage("Podano nieprawidłową jednostkę", "error");
        }
    },

    gifAuthor: function(author) {
        if(author === "") {
            return "Użytkownik anonimowy";
        } else {
            return author;
        }
    },

    buildResultPreview: function(col, img, res) {
        var divPreview = document.createElement("div"),
            divPreviewMeta = document.createElement("div"),
            metaDataList = document.createElement("ul"),
            username = document.createElement("li"),
            size = document.createElement("li"),
            spanUsername = document.createElement("span"),
            spanSize = document.createElement("span");

        if(!res.images.downsized_small) {
            res.images.downsized_small = "";
        }

        divPreview.setAttribute("class", "gif-preview");
        divPreviewMeta.setAttribute("class", "gif-preview-meta");

        //Ewentualne ustawienie kolorów zdefiniowanych przez użytkownika
        if(this.appColor !== "") {
            metaDataList.style.color = this.appColor;
        }

        username.setAttribute("class", "meta-username");
        size.setAttribute("class", "meta-size");
        spanUsername.textContent = this.gifAuthor(res.username);
        spanSize.textContent = this.convertSize(res.images.downsized_small.mp4_size, this.sizeUnit);
        username.appendChild(spanUsername);
        size.appendChild(spanSize);

        metaDataList.appendChild(username);
        metaDataList.appendChild(size);
        divPreviewMeta.appendChild(metaDataList);

        img.addEventListener("click", function() {
            this.openGif(res.images.downsized_small.mp4, res.images.original.url, res.url)
        }.bind(this));

        divPreview.appendChild(img);
        divPreview.appendChild(divPreviewMeta);



        col.appendChild(divPreview);
    },

    buildResultView: function(res) {
        this.resPagination = res.pagination;
        var divResults = document.querySelector(".results"),
            totalResults = this.resPagination.total_count,
            count = this.resPagination.count,
            col1 = document.createElement("div"),
            col2 = document.createElement("div"),
            col3 = document.createElement("div"),
            loopCounter = 0;

        col1.setAttribute("class", "flex col")
        col2.setAttribute("class", "flex col")
        col3.setAttribute("class", "flex col")

        divResults.innerHTML = "";
        this.buildPagination(totalResults / count, divResults);

        //Wyświetlanie wyników
        for(var i = 0; i < res.data.length; i++) {
            var img = new Image();
            img.src = res.data[i].images.downsized_still.url;

            if(loopCounter === 0) {
                this.buildResultPreview(col1, img, res.data[i]);
                loopCounter++;
            }
            else if (loopCounter === 1) {
                this.buildResultPreview(col2, img, res.data[i]);
                loopCounter++;
            }
            else if (loopCounter === 2) {
                this.buildResultPreview(col3, img, res.data[i]);
                loopCounter = 0;
            } else {
                this.printMessage("Wystąpił błąd podczas generowania listy rezultatów!", "error");
            }
        }

        divResults.appendChild(col1);
        divResults.appendChild(col2);
        divResults.appendChild(col3);
    },

    showResults: function(res) {
        if(res.meta.msg === "OK" && res.meta.status === 200) {
            this.buildResultView(res);
        } else {
            this.printMessage("Wystąpił błąd odpowiedzi serwera!", "error");
        }
    },

    //Obsługa zapytań
    serviceRequest: function(properties) {
        var q = properties.q,
            count = properties.count,
            offset = properties.offset,
            searchLanguage = properties.lang;

        //Funkcja odpowiedzialna za utworzenie obiektu XMLHttp i wysłanie odpowiedniego zapytania.
        function ajax(q, count, offset) {
            var q = encodeURI(q);

            return new Promise(function(resolve, reject) {
                var xhttp = new XMLHttpRequest(),
                    req = "http://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=dc6zaTOxFJmzC&limit=" + count + "&offset=" + offset + "&lang=" + searchLanguage;

                xhttp.open("GET", req, true);

                xhttp.onload = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        resolve(JSON.parse(xhttp.response));
                    }
                }

                xhttp.onerror = function(e) {
                    console.log(e);
                    reject(Error("Wystąpił błąd!"));
                }

                xhttp.send();
            });
        }

        //Wywołanie funkcji i spełnianie obietnic
        ajax(q, count, offset)
            .then(function(res) {
                this.showResults(res);
        }.bind(this))
            .catch(function(err) {
                this.printMessage(err, "error");
        }.bind(this))
    },

    //Event zamknięcia powiadomienia
    closeMessage: function(e) {
        var p = e.target.parentNode;
        p.setAttribute("class", "hide");

        setTimeout(function() {
            document.querySelector(".message").removeChild(p);
        }, 800);
    },

    printMessage: function(msg, type) {
        if(!document.querySelector(".message")) {
            var divMsg = document.createElement("div");
            divMsg.setAttribute("class", "message");
        } else {
            var divMsg = document.querySelector(".message");
        }

        var pMsg = document.createElement("p"),
            closeBtn = document.createElement("i");

        pMsg.setAttribute("class", type);
        pMsg.innerHTML = msg;
        closeBtn.setAttribute("class", "fa-window-close");
        closeBtn.addEventListener("click", this.closeMessage.bind(this));
        pMsg.appendChild(closeBtn);

        divMsg.appendChild(pMsg);
        document.body.appendChild(divMsg);
    },

    //Czyszczenie historii wyszukiwania - wykasowanie el. localStorage i wyczyszczenie tablicy
    clearSearchAgent: function() {
        localStorage.removeItem("searchAgent");
        this.tagsArray = [];
        this.printMessage("Historia wyszukiwania została usunięta", "success");
    },

    //Usuwanie podpowiedzi
    deleteHint: function(tag) {
        var index = this.tagsArray.indexOf(tag);

        this.tagsArray.splice(index, 1);
        this.saveArrayToLS();
    },

    //Przenoszenie wciśniętej podpowiedzi do pola wyszukiwania
    enterHint: function(tag) {
        this.searchInput.value = tag;
        this.q = tag;
        this.serviceRequest({
            q: this.q,
            count: this.count,
            offset: this.offset,
            lang: this.searchLanguage
        });
    },

    //Obsługa zdarzeń listy podpowiedzi
    hintListEvents: function() {
        var hint = document.querySelectorAll(".hint p"),
            deleteBtn = document.querySelectorAll(".hint i");


        for(var i = 0; i < hint.length; i++) {
            hint[i].addEventListener("click", function(e) {
                this.enterHint(e.target.textContent);

                this.removeHintListView();
            }.bind(this))

            deleteBtn[i].addEventListener("click", function(e) {
                this.deleteHint(e.target.previousElementSibling.textContent);
                this.removeHintListView();
                this.showHintList();
            }.bind(this));
        }

    },

    //Usuwanie listy podpowiedzi.
    removeHintListView: function() {
        var divSearch = document.querySelector(".search"),
            divHints = divSearch.querySelector(".hints");

        if(divHints !== null) {
            divSearch.removeChild(divHints);
        }

    },

    //Budowanie widoku listy podpowiedzi. Funkcja jako parametr przyjmuje tablicę z listą 5 lub mniej ostatnich wyszukiwań.
    buildHintListView: function(arr) {
        if(!document.querySelector(".hints")) {
            var divHints = document.createElement("div"),
                divFooter = document.createElement("div");

            //Dodaj klasy do DIVów
            divHints.setAttribute("class", "hints flex");
            divFooter.setAttribute("class", "hint-footer");

            //Dodaj rekordy jako osobne divy
            for(var i = 0; i < arr.length; i++) {
                var divHint = document.createElement("div"),
                    p = document.createElement("p"),
                    faClose = document.createElement("i");

                divHint.setAttribute("class", "hint flex");
                faClose.setAttribute("class", "fa-close");

                p.textContent = arr[i];

                divHint.appendChild(p);
                divHint.appendChild(faClose);
                divHints.appendChild(divHint);
            }

            document.querySelector(".search").appendChild(divHints);

            this.hintListEvents();
        }
    },

    //Wyświetlanie listy z podpowiedziami wyszukiwania
    showHintList: function(click) {
        var argumentsArr = [];
        //jeśli tagsArray nie jest pusta to przeiteruj po ostatnich pięciu rekordach i dodaj je do tablicy arguemntsArr, którą później przekażę jako parametr funkcji odpowiedzianej za budowanie widoku listy.
        if(this.tagsArray.length > 0) {
            //Jeżeli jest to pierwsze kliknięcie odwracaj tablicę, a jeśli nie - nie odwracaj!
//            this.tagsArray.reverse();

            //Odwróć tablicę i przytnij do ostatnich 10 wyników
            this.tagsArray.reverse();
            argumentsArr = this.tagsArray.slice(0, 10);
            this.buildHintListView(argumentsArr);
        }
    },

    saveItemToLS: function(key, val) {
        if(typeof Storage !== undefined) {
            localStorage.setItem(key, val);
        } else {
            console.log("Twoja przeglądarka nie obsługuje localStorage. Ustawienia nie zostaną zapamiętane");
        }
    },

    //Wyślij tablicę do localstorage
    saveArrayToLS: function() {
        localStorage.setItem("searchAgent", JSON.stringify(this.tagsArray));
    },

    //Jeżeli w localStorage jest tablica to przekonwertuj i zwróć jako this.tagsArray, a jeśli nie zwróć pustą
    readArrayInLS: function() {
        if(localStorage.getItem("searchAgent")) {
            return this.tagsArray = JSON.parse(localStorage.getItem("searchAgent"));
        } else {
            return this.tagsArray = [];
        }
    },

    //Sprawdzanie czy dany tag nie jest już dodany do tablicy
    checkTagRepitition: function(tag) {
        //jeśli tablica jest pusta zwróć true - nie może być przecież powtórzeń
        if(this.tagsArray.length === 0) {
            return true;
        } else {
            //Iteruj po tablicy w poszukiwaniu powtórzeń - jeśli znajdziesz zwróć false, jeśli nie - true
            for(var i = 0; i < this.tagsArray.length; i++) {
                if(this.tagsArray[i] === tag) {
                    return false;
                }
            }
            return true;
        }
    },

    //Zapisywanie tagu do tablicy
    tagSaveToArray: function(tag) {
        //Usuń białe znaki i konwertuj na małe litery
        var tag = tag.toLowerCase().trim();

        //Jeśli nie ma powtórzeń (funkcja zwróci true) i pustego ciągu znaków odwróc tablicę i dodaj element do tablicy
        if(this.checkTagRepitition(tag) && tag !== "") {
            this.tagsArray.reverse();
            this.tagsArray.push(tag);
        }
    },

    //Czyszczenie pola po wciśnięciu ENTER
    clearInput: function() {
        this.searchInput.value = "";
    },

    //Jeśli zostanie kliknięty obszar poza listą to zamknij ją.
    hintListViewRoll: function(e) {
        if((!e.target.classList.contains("hints")) && (!e.target.classList.contains("hint"))) {
            this.removeHintListView();
            this.tagsArray.reverse();
        }
    },

    //Śledzenie historii wyszukiwania
    searchAgent: function() {
        var click = 0;
        this.searchInput.addEventListener("click", function(e) {
            click++;
            this.showHintList(click);
            e.stopPropagation();
        }.bind(this));

        window.addEventListener("click", this.hintListViewRoll.bind(this));
        document.getElementById("clearHistory").addEventListener("click", this.clearSearchAgent.bind(this));

        //Ciąg operacji dla wciśnięcia Enter w polu wyszukiwania
        this.searchInput.addEventListener("keyup", function(e) {
            if(e.keyCode === 13) {
                this.q = e.target.value;
                this.tagsArray.reverse();
                this.tagSaveToArray(e.target.value, click);
                this.serviceRequest({
                    q: this.q,
                    count: this.count,
                    offset: 0,
                    lang: this.searchLanguage
                });
                this.saveArrayToLS();
                this.clearInput();
                this.removeHintListView();
            }
        }.bind(this));
    },

    removePreloader: function() {
        var preloader = document.querySelector(".preloader");
        preloader.setAttribute("class", "hide");
        setTimeout(function() { document.body.removeChild(preloader); }, 500);
    },

    init: function() {

        this.searchInput = document.querySelector(".search-input");
        this.offset = 0;

        //Metody
        this.setResultsNumber();
            this.count = parseInt(this.resultsNumberInput.value);
        this.setStartTag();
            this.q = this.searchInput.value;
        this.setSizeUnit();
        this.setSearchLanguage();

        //Interakcje
        document.getElementById("defaultSettings").addEventListener("click", this.restoreDefaultSettings.bind(this));

        this.serviceRequest({
            q: this.q,
            count: this.count,
            offset: this.offset,
            lang: this.searchLanguage
        });


        //Dla przeglądarek z localStorage uruchom searchAgent
        if(typeof Storage !== undefined) {
            this.readArrayInLS();
            this.searchAgent();
        }

        window.addEventListener("load", this.removePreloader.bind(this));

        this.setAppColors();
    }
}).init();

function c(c) {
    console.log(c);
}

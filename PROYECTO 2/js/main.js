//ONLOAD
var company = [], salaryFrom = [], salaryTo = [], trabajo = [], pKeys = [], tipo=[], medioDeAplicacion=[], idiomas = [], direccion = [],sponsor = [], isFullRemtoe = [] ,nivel = [], tamano = [], tec_conArreglos = [], tec = [], ciudad = [], estado = [];
var empresaSeleccionada;
// PRESENTANDO EN SELECT TODAS LAS EMPRESAS
fetch("https://devitjobs.us/api/jobsLight")  //API a consumir
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            company.push(data[i].company)
            salaryFrom.push(data[i].annualSalaryFrom)
            salaryTo.push(data[i].annualSalaryTo)
            trabajo.push(data[i].jobType)
            sponsor.push(data[i].hasVisaSponsorship)
            nivel.push(data[i].expLevel)
            tamano.push(data[i].companySize)
            tec.push(data[i].technologies)
            ciudad.push(data[i].cityCategory)
            estado.push(data[i].stateCategory)
            isFullRemtoe.push(data[i].isFullRemote)
            pKeys.push(data[i].perkKeys)
            direccion.push(data[i].address)
            idiomas.push(data[i].language)
            medioDeAplicacion.push(data[i].candidateContactWay)
            tipo.push(data[i].jobType)

        }

         //CONJUNTO DE EMPRESAS dentro del SELECT
        conjCompany = new Set(company)
        document.querySelector('div.input-group > select').innerHTML += `<option value="TODAS">TODAS LAS EMPRESAS</option>`
        for (let comp of conjCompany) {
            let listaComp = `<option value="${comp}">${comp}</option>`
            document.querySelector('div.input-group > select').innerHTML += listaComp
        }


        // CHANGE EVENT PARA MOSTRAR LAS EMPRESAS
        let selectElemento = document.querySelector('.custom-select');
        selectElemento.addEventListener('change', (eventChange) => {
            empresaSeleccionada = eventChange.target.value;
                      
       
            //NIVELES DE EXPERIENCIA
            var conjNiveles = ['Regular', 'Lead', 'Senior', 'Junior']
            var nivel1 = 0, nivel2 = 0, nivel3 = 0, nivel4 = 0;
            for (let n in nivel) {
                if (empresaSeleccionada == "TODAS") {
                    console.log('empresa seleccionada ',empresaSeleccionada)
                    switch (nivel[n]) {
                        case 'Regular':
                            nivel1++;
                            break;
                        case 'Lead':
                            nivel2++;
                            break;
                        case 'Senior':
                            nivel3++;
                            break;
                        case 'Junior':
                            nivel4++;
                            break;
                        default:
                            break;
                    }
                }
                if (empresaSeleccionada == company[n]) {
                    switch (nivel[n]) {
                        case 'Regular':
                            nivel1++;
                            break;
                        case 'Lead':
                            nivel2++;
                            break;
                        case 'Senior':
                            nivel3++;
                            break;
                        case 'Junior':
                            nivel4++;
                            break;
                        default:
                            break;
                    }
                }


            }
            //PIE CHAR
            var ctxL = document.getElementById("PieChart").getContext('2d');

            let chartStatus3 = Chart.getChart("PieChart");
            if (chartStatus3 != undefined) {
                chartStatus3.destroy()
            }
            var myLineChart = new Chart(ctxL, {
                type: 'pie',
                data: {
                    labels: conjNiveles,
                    datasets: [{
                        label: "Salario desde",
                        data: [nivel1, nivel2, nivel3, nivel4],
                        backgroundColor: [
                            'rgba(105, 0, 132, .2)',
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ],
                        borderColor: [
                            'rgba(200, 99, 132, .7)',
                        ],
                        borderWidth: 2,
                        hoverOffset: 4
                    },
                    ]
                },
                options: {
                    responsive: true
                }
            });
            //FIN PIE CHART

            //LINE CHART
            var data1 = []//salarios anaules desde
            var data2 = []//salarios anauales hasta
            var l = [];
            var cont = 1;
            for (let i in company) {
                if (empresaSeleccionada == company[i]) {
                    data1.push(salaryFrom[i])
                    data2.push(salaryTo[i])
                    l.push(cont++)

                }
                if (empresaSeleccionada == "TODAS") {
                    data1.push(salaryFrom[i])
                    data2.push(salaryTo[i])
                    l.push(cont++)

                }
            }

            var ctxL = document.getElementById("lineChart").getContext('2d');

            let chartStatus = Chart.getChart("lineChart");
            if (chartStatus != undefined) {
                chartStatus.destroy()
            }
            var myLineChart = new Chart(ctxL, {


                type: 'line',
                data: {
                    labels: l,
                    datasets: [{
                        label: "Salario desde",
                        data: data1,
                        backgroundColor: [
                            'rgba(105, 0, 132, .2)',
                        ],
                        borderColor: [
                            'rgba(200, 99, 132, .7)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: "Salario hasta",
                        data: data2,
                        backgroundColor: [
                            'rgba(0, 137, 132, .2)',
                        ],
                        borderColor: [
                            'rgba(0, 10, 130, .7)',
                        ],
                        borderWidth: 2
                    }
                    ]
                },
                options: {
                    responsive: true
                }
            }); // FIN LINE CHART


            // BAR H CHART
            var tecs = [];
            for (let i in company) {
                if (empresaSeleccionada == company[i]) {
                    tecs = tecs.concat(tec[i])
                }
                if (empresaSeleccionada == "TODAS") {
                    tecs = tecs.concat(tec[i])
                }
                tecConj = new Set(tecs)
                arregloTecUnicos = Array.from(tecConj)
            }
            // console.log(arregloTecUnicos)
            // console.log(tecs)
            let cant =[]
            for (let t of arregloTecUnicos) {
                a = tecs.filter(e => e == t)
                cant.push(a.length)

            }
            
            
            // console.log(cant)

            //https://www.chartjs.org/docs/latest/samples/bar/horizontal.html
            //https://www.chartjs.org/docs/latest/charts/bar.html
            var ctxL = document.getElementById("barChart");
            let chartStatus5 = Chart.getChart("barChart");
            if (chartStatus5 != undefined) {
                chartStatus5.destroy()
            }
            var myLineChart = new Chart(ctxL, {

                type: 'bar',
                data: {
                    labels: arregloTecUnicos,
                    datasets: [{
                        // label: arregloTecUnicos,
                        data: cant,
                        backgroundColor: [
                            'rgba(105, 0, 132, .2)',
                            'rgba(100, 10, 132, .5)',
                        ],
                        borderColor: [
                            'rgba(200, 99, 132, .7)',
                        ],
                        borderWidth: 2
                    },]
                },
                options: {
                    responsive: true
                }
            });
            // FIN DE BAR H CHART


            //BAR CHART
            var est = []//estados
            var ciu = []//ciudades
            var l2 = [];
            var cont = 1;
            var sponsorship;
            var isRemote;
            var size;
            var dir=[];
            var lang;
            var pk=[];
            var tipoTrabajo;
            var dondeAplicar;
            for (let i in company) {
                if (empresaSeleccionada == company[i]) {
                    est.push(estado[i])
                    ciu.push(ciudad[i])
                    l2.push(cont++)
                    sponsorship=sponsor[i]
                    isRemote=isFullRemtoe[i]
                    size=tamano[i]
                    dir.push(direccion[i])
                    lang = idiomas[i]
                    pk=pk.concat(pKeys[i])
                    dondeAplicar=medioDeAplicacion[i]
                    tipoTrabajo=tipo[i]
                }
                if (empresaSeleccionada == "TODAS") {
                    
                    l2.push(cont++)

                }
            }
            
            // tecConj = new Set(tecs)
            //     arregloTecUnicos = Array.from(tecConj)
            
            
            
            if(empresaSeleccionada!= "TODAS"){
                document.getElementById('tipo').innerHTML = `${tipoTrabajo}`
                document.getElementById('sponsorship').innerHTML = `${sponsorship}`
                document.getElementById('tamanio').innerHTML = `${size}`
                isRemote == false ? document.getElementById('remoto').innerHTML = `No` : document.getElementById('remoto').innerHTML = `Si`
                document.getElementById('aplicacion').innerHTML = `${dondeAplicar}`
                document.getElementById('idioma').innerHTML = `${lang}`
                document.getElementById('direccion').innerHTML = `${dir[0]}`
                document.getElementById('perkKeys').innerHTML = ``  
                for(let p of pk){
                    document.getElementById('perkKeys').innerHTML += `${p} <br>`
                }
               
            }
            else{
                document.getElementById('tipo').innerHTML = `Hay distintos tipos de trabajo`
                document.getElementById('sponsorship').innerHTML =  `Algunas empresas ofrecen patrocinio`
                document.getElementById('tamanio').innerHTML = ` Las empresas tienen varidad de tamaño`
                document.getElementById('remoto').innerHTML = `Pocas empresas trabajan remoto totalmente`
                document.getElementById('aplicacion').innerHTML = `Existen varios metodos para aplicar`
                document.getElementById('idioma').innerHTML = `Principalmente se pide inglés`
                document.getElementById('direccion').innerHTML = `Hay distintas direcciones por empresa`
                document.getElementById('perkKeys').innerHTML = `Hay distintas perk keys por empresa` 
            }
           
            // //CIUDAD - ESTADO DE LA EMPRESA
            var est = [];
            var ciu =[]
            for (let i in company) {
                if (empresaSeleccionada == company[i]) {
                    ciu = ciu.concat(ciudad[i])
                    est = est.concat(estado[i])
                }
                if (empresaSeleccionada == "TODAS") {
                    ciu = ciu.concat(ciudad[i])
                    est = est.concat(estado[i])
                }
                estConj = new Set(est)
                ciuConj = new Set(ciu)
                arregloTecUnicosCiu = Array.from(ciuConj)
                arregloTecUnicosEst = Array.from(estConj)
            }
            let cantCiu =[]
            let cantEst =[]
            for (let t of arregloTecUnicosCiu) {
                a = ciu.filter(e => e == t)
                cantCiu.push(a.length)

            }
            for (let t of arregloTecUnicosEst) {
                a = est.filter(e => e == t)
                cantEst.push(a.length)

            }
           
            var ctxL = document.getElementById("columnChart").getContext('2d');
            let chartStatus2 = Chart.getChart("columnChart");
            if (chartStatus2 != undefined) {
                chartStatus2.destroy()
            }
            var myLineChart = new Chart(ctxL, {

                type: 'bar',
                data: {
                    labels: l2,
                    datasets: [{
                        label: arregloTecUnicosCiu,
                        data: cantCiu,
                        backgroundColor: [
                            'rgba(105, 0, 132, .2)',
                        ],
                        borderColor: [
                            'rgba(200, 99, 132, .7)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: arregloTecUnicosEst,
                        data: cantEst,
                        backgroundColor: [
                            'rgba(0, 137, 132, .2)',
                        ],
                        borderColor: [
                            'rgba(0, 10, 130, .7)',
                        ],
                        borderWidth: 2
                    }
                    ]
                },
                options: {
                    responsive: true
                }
            });//FIN DEL BAR CHART

        })//FIN EVENT CHANGE
            .catch(console.error); //FIN LINE CHART

    }); //FIN FETCH







// });

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: false
    });


    // Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                label: "USA",
                data: [15, 30, 55, 65, 60, 80, 95],
                backgroundColor: "rgba(0, 156, 255, .7)"
            },
            {
                label: "UK",
                data: [8, 35, 40, 60, 70, 55, 75],
                backgroundColor: "rgba(0, 156, 255, .5)"
            },
            {
                label: "AU",
                data: [12, 25, 45, 55, 65, 70, 60],
                backgroundColor: "rgba(0, 156, 255, .3)"
            }
            ]
        },
        options: {
            responsive: true
        }
    });


    // Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                label: "Salse",
                data: [15, 30, 55, 45, 70, 65, 85],
                backgroundColor: "rgba(0, 156, 255, .5)",
                fill: true
            },
            {
                label: "Revenue",
                data: [99, 135, 170, 130, 190, 180, 270],
                backgroundColor: "rgba(0, 156, 255, .3)",
                fill: true
            }
            ]
        },
        options: {
            responsive: true
        }
    });



    // Single Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Salse",
                fill: false,
                backgroundColor: "rgba(0, 156, 255, .3)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(0, 156, 255, .7)",
                    "rgba(0, 156, 255, .6)",
                    "rgba(0, 156, 255, .5)",
                    "rgba(0, 156, 255, .4)",
                    "rgba(0, 156, 255, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(0, 156, 255, .7)",
                    "rgba(0, 156, 255, .6)",
                    "rgba(0, 156, 255, .5)",
                    "rgba(0, 156, 255, .4)",
                    "rgba(0, 156, 255, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(0, 156, 255, .7)",
                    "rgba(0, 156, 255, .6)",
                    "rgba(0, 156, 255, .5)",
                    "rgba(0, 156, 255, .4)",
                    "rgba(0, 156, 255, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


})(jQuery);

// document.addEventListener("DOMContentLoaded", () => {
//     cargarJson();
// })
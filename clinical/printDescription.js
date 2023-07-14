<script>
function printDescription(){
    try {
	let hospitalName = "CURE Ethiopia Children's Hospital";
        let frame1 = document.createElement('iframe');
        frame1.name = "frame1";
        frame1.style.position = "absolute";
        frame1.style.top = "-1000000px";
        document.body.appendChild(frame1);
        let frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;

        frameDoc.document.open();
        frameDoc.document.write('<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"  \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">');
        frameDoc.document.write('<html><head><style> * {-webkit-print-color-adjust: exact !important; color-adjust: exact !important;} #obs-table{ border-collapse: collapse; width: 100%}.patient-info{font-size: 16px;} table,td,th {padding: 10px; border: 1px solid black; border-collapse: collapse; } .info{display: inline-block; width:50px} .dispensers-footer{width: 150px; display: block; border-bottom: solid 1px black; } .presriber-uline{width: 200px; display: inline-block; border-bottom: solid 1px black; } .presriber-info{width: 130px; display: inline-block; }</style> </head>');
        frameDoc.document.write('<body style="margin: 5mm 10mm 5mm 10mm;">');
        frameDoc.document.write('<div style="text-align: center;"><table style="margin: auto;border:none; padding:0px;"><tr>');
        frameDoc.document.write(`<td style="border:none"><img src="https://cure.org/wp-content/themes/cure/images/logo.svg" alt="logo" style="width: 120px;"></td>`);
        frameDoc.document.write(`<td style="border:none"><span style="font-weight: bold ; font-size:22px; margin-left: 0px;">${hospitalName}</span></td>`);
        frameDoc.document.write('</tr></table>');
        //frameDoc.document.write(`<h3>${title[0].innerHTML}</h3></div>`);
        frameDoc.document.write(`<h3 style="text-transform: uppercase;">Prescription</h3></div>`);
        frameDoc.document.write(`<strong>P.O.BOX 26134-1000 Addis Ababa, Ethiopia</br>TEL +251-1227520 /59/65/80 </strong></br></br>`);
        var patientName = document.getElementById("med-patient-name").innerHTML;
        var dob= document.getElementById("med-patient-dob").innerHTML;
        var age= calculate_age(new Date(document.getElementById("med-patient-dob").innerHTML))
        var gender = document.getElementById("med-patient-gender").innerHTML;
        var identifier = document.getElementById("med-patient-identifier").innerHTML;
//	console.log(patientName+"|"+dob+"|"+age+"|"+gender+"|"+identifier);
        frameDoc.document.write(`<div>`);
                frameDoc.document.write(`<span class="patient-info"><strong>Name of the Patient:</strong> <span>${patientName} ${identifier}</span> </br></span>`);
                frameDoc.document.write(`<span class="patient-info"><strong>Sex:</strong> <span style="width:93px"class='info'>${gender}</span> <strong>Age:</strong> <span style="width:60px"class='info'>${age}</span>  <strong>Weight:</strong> <span style="width: 55px" class='info'></span> <strong>Card No:</strong> <span class='info'></span></br></span>`);
                frameDoc.document.write(`<span class="patient-info"><strong>Region:</strong> <span style="width:68px"class='info'></span> <strong>Town:</strong> <span class='info'></span> <strong>Woreda:</strong> <span class='info'></span> <strong>Kebele:</strong> <span class='info'></span> </br></span>`);
                frameDoc.document.write(`<span class="patient-info"><strong>House No:</strong> <span class='info'></span> <strong>Tel No:</strong> <span class='info'></span> <input type="checkbox" name="patient-type"> Inpatient &nbsp <input type="checkbox" name="patient-type"> Outpatient </br></span>`);
                frameDoc.document.write(`<span class="patient-info"><strong>Diagnosis(ICD code No):</strong> </r></span>`);
        frameDoc.document.write(`</div> </br></br>`);
        frameDoc.document.write('<table>');

        frameDoc.document.write(`<div>`);
        frameDoc.document.write(`<table id="obs-table" style="border-collapse: collapse; width: 100% ;margin-bottom: 10px">`);
                frameDoc.document.write(`<tr>`);
                        frameDoc.document.write(`<th>Drug Name, Strength, Dosage,Frequency,Duration, How to use & Other Information</th>`);
                        frameDoc.document.write(`<th>Price(Dispensers use only)</th>`);
                frameDoc.document.write(`</tr>`);
                        try{
                            	var medication = document.querySelectorAll('.drug-details');
                                var arrayLength = medication.length;
                                var counter =0;
                                medication.forEach(info=>{
                                        if(counter >= (arrayLength/2)){
                                                console.log("Length: "+arrayLength+"Counter: "+counter)
                                                return;
                                        }

                                        frameDoc.document.write(`<tr><td style="font-size:16px"><strong>${info.innerText}</strong></td></tr>`);
                                        counter++;
                                });
                                console.log(medication);
                        }catch(err){
                                console.log(err)
                        }
                frameDoc.document.write(`<tr> `);
                        frameDoc.document.write(`<td colspan="2">`);
                          frameDoc.document.write(`<div style="display: inline-block; width: 400px; float: left;">`);
                                frameDoc.document.write(`<h3 style="font-size:16px">PRESCRIBER'S</h3>`);
                                frameDoc.document.write(`<span class="presriber-info">FULL NAME</span><span class="presriber-uline"></span></br>`);
                                frameDoc.document.write(`<span class="presriber-info">QUALIFICATION</span><span class="presriber-uline"></span></br>`);
                                frameDoc.document.write(`<span class="presriber-info">SIGNATURE</span><span class="presriber-uline"></span></br>`);
                                currentDate = new Date();
                                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                                frameDoc.document.write(`<span class="presriber-info">DATE</span><span> ${currentDate.toLocaleDateString("en-US", options)}</span></br>`);
                          frameDoc.document.write(`</div>`);
                          frameDoc.document.write(`<div style="display: inline-block; width: 150px; float: right; margin-left: 20px;">`);
                                frameDoc.document.write(`<h3 style="font-size:16px">DISPENSER'S</h3>`);
                                frameDoc.document.write(`<span class="dispensers-footer"></span></br>`);
                                frameDoc.document.write(`<span class="dispensers-footer"></span></br>`);
                                frameDoc.document.write(`<span class="dispensers-footer"></span></br>`);
                                frameDoc.document.write(`<span class="dispensers-footer"></span></br>`);
                                frameDoc.document.write(`</div>`);
                        frameDoc.document.write(`</td>`);
                frameDoc.document.write(`</tr>`);
                frameDoc.document.write(`</table>`);
        frameDoc.document.write(`</div>`);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            // Method to add Title to the page
            window.frames["frame1"].onbeforeprint = (event) => {
                let patientData = document.querySelectorAll('.patient-info-fixed');
                let patientName = "";
                patientData.forEach(patient => {
                    names_uuid = patient.querySelectorAll('.patient-name');
                    names_uuid.forEach(info => {
                        patientName = patientName + info.innerHTML;
                    });
                });
                document.title = `${patientName}_Prescription`;
            };
           window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
    } catch (err) {
      console.log(err)
      alert("This Data can't be printed!")
      document.querySelector("body iframe:last-of-type").remove();
      return;
    }
}

function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
</script>

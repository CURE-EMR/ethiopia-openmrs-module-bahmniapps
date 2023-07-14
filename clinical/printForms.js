function printForm(){
  try {
    let hospitalName = "CURE Ethiopia Children's Hospital";
    let allComponents = document.querySelectorAll('.patient-form-data');
    let title = allComponents[0].querySelectorAll('.section-title');
    let observations = allComponents[0].querySelectorAll('.hidden-print');
    let frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    let frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;

    frameDoc.document.open();
    frameDoc.document.write('<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"  \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">');
    frameDoc.document.write('<html><head><style> * {-webkit-print-color-adjust: exact !important; color-adjust: exact !important;} #obs-table{ border-collapse: collapse; width: 100%} #obs-table td{border: 2px solid #c6c7cc; padding: 2px 2px;}</style> </head>');
    frameDoc.document.write('<body style="margin: 5mm 10mm 5mm 10mm;">');
    frameDoc.document.write('<div style="text-align: center;"><table style="margin: auto;"><tr>');
    frameDoc.document.write(`<td style="border:none"><img src="https://cure.org/wp-content/themes/cure/images/logo.svg" alt="logo" style="width: 120px;"></td>`);
    frameDoc.document.write(`<td style="border:none"><span style="font-weight: bold ; font-size:22px; margin-left: 0px;">${hospitalName}</span></td>`);
    frameDoc.document.write('</tr></table>');
    frameDoc.document.write(`<h3>${title[0].innerHTML}</h3></div>`);

    // Adding Patient information names and Identifier
    let patientData = document.querySelectorAll('.patient-info-fixed');
    patientData.forEach(patient => {
      let patientInfo = patient.querySelectorAll('.patient-name');
      let patientName = "";
      patientInfo.forEach(info=>{
        patientName = patientName + info.innerHTML;
      });
      frameDoc.document.write(`Patient: <span style="font-size: 18px;font-weight: bold;">${patientName}</span> </br></br>`);
    });
    let skip_header = -1;
    frameDoc.document.write('<table id="obs-table" style="border-collapse: collapse; width: 100% ;margin-bottom: 10px">')
    observations = observations[0].querySelectorAll('li.has-child');
    var counter =0;
    observations.forEach(obs => {
      skip_header++;
      if(skip_header ==0){
//        return;
      }
      try{
        if(counter == 0){
          var parentObs = obs.querySelectorAll('.tree-list-item');
          parentObs.forEach(childObs => {
            let innerChild1 = childObs.querySelectorAll('.testUnderPanel');
            let innerChild2 = childObs.querySelectorAll('pre.left');
	    if(innerChild1[0].innerText == title[0].innerText){
		innerChild1[0].innerText="";
	    }
       	    if(innerChild2.length == 0){
		frameDoc.document.write('</table>')
		frameDoc.document.write(`<h2>${innerChild1[0].innerText}</h2>`)
		frameDoc.document.write('<table id="obs-table" style="border-collapse: collapse; width: 100% ;margin-bottom: 10px">')
	    }
            if(innerChild2.length != 0){
              frameDoc.document.write(`<tr><td style="width: 35%;font-size:16px"><strong>${innerChild1[0].innerText}</strong></td>`);
              frameDoc.document.write(`<td style="font-size:16px"> ${innerChild2[0].innerText}</td></tr>`);
            }
  	      });
        }
        counter++
     }catch (err) {
        console.log(err)
      }
    });

    frameDoc.document.write('</table>')
    frameDoc.document.write('<h3 style="font-size:16px">Other Notes:</h3> <textarea name="other-notes" id="other-notes" rows="8" style="width: 100%; margin-bottom: 20px; margin-top:5px;border-color: darkgray;border-radius: 5px;"></textarea>')
    currentDate = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    frameDoc.document.write(`</br><span style="font-weight: bold ; float: left; font-size:16px"> Signature:</span>   <span style="font-size:16px;float : right">Date: ${currentDate.toLocaleDateString("en-US", options)} </span>`);
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
            document.title = `${title[0].innerHTML}, ${patientName}`;
        };
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
  } catch (err) {
      alert("This form can't be printed!")
      document.querySelector("body iframe:last-of-type").remove();
      return;
    }
}


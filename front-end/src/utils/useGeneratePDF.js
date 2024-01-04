import jsPDF from "jspdf";

export const generatePDFWrapper = ({engData, heading, fileName}) => {
    //create a new instance of jsPDF
    const pdf = new jsPDF();

    //Font styling for heading
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(24);

    //heading
    pdf.text(`${heading}`, 10, 10);

    //Font styling for content
    pdf.setFont('times', 'italic');
    pdf.setFontSize(12);
    
    //data
    engData?.forEach((data, index) => {
      let yPosition = 30 + index * 20;//Adjust Y position based on index
    
      let wordMeaning = `${index+1}. `;

      if(heading === "Vocabularies" || heading === "Synonyms" || heading === "Instead of very")
        wordMeaning += `${data.word} - `;
      else if(heading === "Idioms")
        wordMeaning += `${data.idiom} - `;
      else if(heading === "Advanced Phrases")
        wordMeaning += `${data.normalPhrase} - `;

      if(heading === "Vocabularies" || heading === "Idioms" )
        wordMeaning += `${data.meaning}`;
      else if(heading === "Synonyms")
        wordMeaning += `${data.synonyms}`;
      else if(heading === "Instead of very")
        wordMeaning += `${data.alternative}`;
      else if(heading === "Advanced Phrases")
        wordMeaning += `${data.advancedPhrase}`;
      else if(heading === "Grammar")
      {
        //number of lines
        const lines = pdf.splitTextToSize(data.notes, pdf.internal.pageSize.height - 15);
        pdf.text(data.heading, 10, yPosition);//heading

        //loop through the lines and add to the document
        for(let i=0; i<lines.length; i++)
        {
          if(yPosition > 180)// Assuming 20 lines will fit on a page, you can adjust the value
          {
            pdf.addPage();  // Start a new page
            yPosition = 10;  // Reset y position for the new page
          }

          pdf.text(lines[i], 10, yPosition);
          yPosition += 10;  // Adjust this value based on your font size and spacing
        }
      }       
      
      //add content to the pdf (string, x, y)
      if(heading === "Vocabularies" || heading === "Synonyms" || heading === "Idioms" || heading === "Instead of very" || heading === "Advanced Phrases")
        pdf.text(wordMeaning, 10, yPosition);

      pdf.text(`${data.sentence ? data.sentence : ""}`, 10, (yPosition + 10));
      pdf.text('', 10, (yPosition + 10)); //empty line
    })
    
     // Save the PDF or display it to the user
     pdf.save(`${fileName}.pdf`);
  };//generatePDF
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
        const lines = data.notes.split("\n");//number of lines

        pdf.text(data.heading, 10, yPosition);//heading
        pdf.text(data.notes, 10, lines.length > 30 ? (yPosition + 50) : 10);
        
        //remove empty lines
        // const numberOfLines = lines.filter(line => line.trim() !== '');

        if(lines.length > 30 || yPosition >= pdf.internal.pageSize.height)
        {
          pdf.addPage();
          yPosition = 10;
        }
        // pdf.text(data.notes, 10, (yPosition + 50));

        // const lines = data.notes.split("\n");

        //remove empty lines
        // const numberOfLines = lines.filter(line => line.trim() !== '');

        // if(numberOfLines.length > 10)
        // {
        //   if(yPosition >= pdf.internal.pageSize.height)
        //   {
        //     pdf.addPage();
        //     yPosition = 10;
        //   }
        // }
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
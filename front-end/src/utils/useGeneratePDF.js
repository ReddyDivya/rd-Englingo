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
      const yPosition = 30 + index * 20;//Adjust Y position based on index
    
      let wordMeaning = `${index+1}. `;
      
      if(heading === "Vocabularies" || heading === "Synonyms")
        wordMeaning += `${data.word} - `;
      else if(heading === "Idioms")
        wordMeaning += `${data.idiom} - `;

      if(heading === "Vocabularies" || heading === "Idioms")
        wordMeaning += `${data.meaning}`;
      else if(heading === "Synonyms")
        wordMeaning += `${data.synonyms}`;
      
      //add content to the pdf (string, x, y)
      if(heading === "Vocabularies" || heading === "Synonyms" || heading === "Idioms")
        pdf.text(wordMeaning, 10, yPosition);

      pdf.text(`${data.sentence}`, 10, (yPosition + 10));
      pdf.text('', 10, (yPosition + 10)); //empty line
    })
    
     // Save the PDF or display it to the user
     pdf.save(`${fileName}.pdf`);
  };//generatePDF
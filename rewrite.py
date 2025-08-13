from PyPDF2 import PdfReader, PdfWriter

# Load the original PDF
input_path = "./GasBoilerService.pdf"
output_path = "/mnt/data/GasBoilerService_Modified.pdf"

reader = PdfReader(input_path)
writer = PdfWriter()

# Copy all pages from reader to writer
for page in reader.pages:
    writer.add_page(page)

# Remove the form field named "Appliance_3_No"
fields = reader.get_fields()
if "Appliance_3_No" in fields:
    writer.update_page_form_field_values(writer.pages[0], {"Appliance_3_No": None})
    del writer._root_object["/AcroForm"]["/Fields"].get_object()[
        list(fields.keys()).index("Appliance_3_No")
    ]

# Write the updated PDF
with open(output_path, "wb") as f:
    writer.write(f)

output_path

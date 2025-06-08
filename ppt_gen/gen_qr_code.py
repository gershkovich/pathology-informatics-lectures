# 1)  Install the library once (at a terminal):
#     pip install qrcode[pil]

# 2)  Run this script (edit the URL and output filename as you like):

import qrcode

url = "https://medicine.yale.edu/profile/peter-gershkovich/"   # landing page for the QR code
output_file = "hedgehog_qr.png"                 # PNG, but JPG/SVG also possible

qr = qrcode.QRCode(
    version=1,                     # auto-size up to 40; 1 is 21×21 modules
    error_correction=qrcode.constants.ERROR_CORRECT_M,  # up to 15% damage recovery
    box_size=10,                   # how many pixels per “box”
    border=4,                      # quiet-zone border boxes
)

qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save(output_file)

print(f"Saved QR code to {output_file}")
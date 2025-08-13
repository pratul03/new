import pandas as pd

# File path
file_path = "./368_data.csv"

# Define the actual column names in the correct order
columns = [
    "asset_id", "site_id", "asset_name", "manufacturer", "category", "sub_category", "sub_category2",
    "position", "floor", "room", "model", "serial_number", "purchase_date", "supplier", "transaction_id",
    "cost", "invoice_file", "folder_id", "image", "pat_item", "pfp_item", "door_item", "barcode",
    "valuation_date", "valuation_value", "valuation_user_id", "disposal_date", "disposal_value", "disposal_to",
    "sub_category3", "related_asset_id", "device_id", "migrated", "power_output", "damper_size"
]

# Read CSV with the given column names
df = pd.read_csv(file_path, names=columns, header=None)

# Filter rows where site_id = 368
filtered_df = df[df["site_id"] == 368]

# Generate SQL insert statements
sql_statements = []
for _, row in filtered_df.iterrows():
    values = []
    for val in row:
        if pd.isna(val):
            values.append("NULL")
        elif isinstance(val, str):
            values.append("'" + val.replace("'", "''") + "'")
        else:
            values.append(str(val))
    sql = f"INSERT INTO property_management.assets ({', '.join(columns)}) VALUES ({', '.join(values)});"
    sql_statements.append(sql)

# Save to file
output_path = "./data/insert_statements.sql"
with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(sql_statements))

output_path

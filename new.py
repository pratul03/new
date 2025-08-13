import pandas as pd
import os

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

# Generate SQL insert statements with ON CONFLICT DO NOTHING
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

    sql = (
        "INSERT INTO property_management.assets (\n    "
        + ", ".join(columns)
        + "\n) VALUES (\n    "
        + ", ".join(values)
        + "\n) ON CONFLICT (asset_id) DO NOTHING;"
    )
    sql_statements.append(sql)

# Ensure output directory exists
os.makedirs("./data", exist_ok=True)

# Save to file
output_path = "./data/insert_statements.sql"
with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n\n".join(sql_statements))

print(f"SQL file generated at: {output_path}")

import random
import pandas as pd
from faker import Faker
from datetime import datetime, timedelta
import os

# Create output directory
os.makedirs("data", exist_ok=True)

fake = Faker('en_GB')

# Parameters
num_users = 15
calls_per_user = 40  # 15 users × 40 calls = 600 rows approx.
sim_providers = ['Vodafone', 'EE', 'O2']
call_types = ['Voice', 'SMS', 'Data']
call_statuses = ['Completed', 'Missed', 'Failed']

# Generate users
users = [{
    "UserID": i,
    "Mobile": f"07{random.randint(100000000, 999999999)}",
    "Provider": random.choice(sim_providers)
} for i in range(num_users)]

call_id = 1000

# Generate and save individual user call records
for user in users:
    call_records = []
    for _ in range(calls_per_user):
        call_type = random.choice(call_types)
        start_time = fake.date_time_between(start_date='-30d', end_date='now')
        duration = random.randint(10, 600) if call_type == 'Voice' else 0
        end_time = start_time + timedelta(seconds=duration)
        status = 'Completed' if call_type == 'Voice' and duration > 0 else random.choice(call_statuses)
        cost = round(duration * 0.01, 2) if status == 'Completed' else 0.00
        destination = f"07{random.randint(100000000, 999999999)}"
        
        call_records.append({
            "CallID": call_id,
            "UserID": user["UserID"],
            "Source": user["Mobile"],
            "Destination": destination,
            "StartTime": start_time.strftime('%Y-%m-%d %H:%M:%S'),
            "EndTime": end_time.strftime('%Y-%m-%d %H:%M:%S') if duration > 0 else '',
            "Duration": duration,
            "CallType": call_type,
            "Status": status,
            "Cost": cost,
            "Provider": user["Provider"]
        })
        call_id += 1

    # Save each user's data to a separate CSV file
    df_user = pd.DataFrame(call_records)
    df_user.to_csv(f"data/UK_CDR_User_{user['UserID']}.csv", index=False)

print("All 15 user CSV files have been created in the 'data' folder.")

import pandas as pd
import random
from datetime import datetime, timedelta
import os

def generate_user_cdr_files(output_dir="cdr_users", num_users=12, rows_per_user=100):
    os.makedirs(output_dir, exist_ok=True)

    for user_id in range(1, num_users + 1):
        user_msisdn = f"+4479{random.randint(10000000, 99999999)}"
        call_types = ["Voice", "SMS", "Data"]
        base_time = datetime(2025, 6, 1, 10, 0, 0)
        cdr_data = []

        for i in range(rows_per_user):
            call_type = random.choice(call_types)
            start_time = base_time + timedelta(minutes=random.randint(0, 10000))
            duration = (
                random.randint(30, 600) if call_type == "Voice" else
                0 if call_type == "SMS" else
                random.randint(300, 7200)
            )
            end_time = start_time + timedelta(seconds=duration)
            data_used = 0 if call_type in ["Voice", "SMS"] else round(random.uniform(1, 1000), 2)
            cdr_data.append({
                "CDR_ID": f"USR{user_id}-{1000 + i}",
                "Caller": user_msisdn,
                "Receiver": f"+4479{random.randint(10000000, 99999999)}" if call_type != "Data" else "N/A",
                "Start_Time": start_time.strftime("%Y-%m-%d %H:%M:%S"),
                "End_Time": end_time.strftime("%Y-%m-%d %H:%M:%S"),
                "Duration_Seconds": duration if call_type != "SMS" else 0,
                "Call_Type": call_type,
                "IMEI": random.randint(356938000000000, 356938999999999),
                "Cell_ID": random.randint(10000, 99999),
                "Data_Used_MB": data_used,
                "Network": random.choice(["Vodafone UK", "EE", "O2"])
            })

        df = pd.DataFrame(cdr_data)
        filename = f"user_{user_id}_cdr.cdr"
        filepath = os.path.join(output_dir, filename)
        df.to_csv(filepath, index=False)

    print(f"✅ All {num_users} CDR files generated inside '{output_dir}/'")

# Run this
generate_user_cdr_files()

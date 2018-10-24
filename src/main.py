import pandas as pd


# Input
df = pd.read_csv('data/acm.tsv', delimiter='\t')
print(df.columns)

# Clean the Data
df = df.drop(['Timestamp', 'Email Address'], axis=1)
df = df.rename(index=str, columns={
    'SIGs Interested in Attending [Choose Multiple]': 'SIGs Interest',
    'What programming, scripting, and markup languages are you comfortable with?': 'Programming Languages',
    'What career fields are you interested in? ': 'Career Fields',
})

# Output
print(df.columns)
df.to_csv('data/acm.tsv', sep='\t')
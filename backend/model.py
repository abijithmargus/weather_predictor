import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
# Save the trained model

df=pd.read_csv(r"C:\Users\Abijith\Downloads\seattle-weather.csv")
# print(df.head())

X=df[['precipitation','temp_max','temp_min','wind']]
y=df['weather']
# print(y)

X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.25)

model = RandomForestClassifier(n_estimators=200, max_depth=3)
model.fit(X_train, y_train)
joblib.dump(model, 'model.pkl')
y_pred=model.predict(X_test)

print(f'{accuracy_score(y_test,y_pred):.2f}')
print(model.predict([[0,14.0,5.7,2.7]]))
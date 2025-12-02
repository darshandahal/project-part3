from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO
import base64
import os

app = FastAPI()

# Enable CORS for Next.js requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV
csv_path = 'All_Diets.csv'
df = pd.read_csv(csv_path)

# Helper function to convert matplotlib plot to base64
def plot_to_base64():
    buffer = BytesIO()
    plt.savefig(buffer, format='png', bbox_inches='tight', dpi=100)
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()
    plt.close()
    return image_base64

@app.get("/api/bar-chart")
def get_bar_chart():
    """Average macronutrient content by diet type"""
    try:
        # Group by diet type and calculate mean
        diet_nutrients = df.groupby('Diet Type')[['Protein', 'Carbs', 'Fat']].mean()
        
        fig, ax = plt.subplots(figsize=(10, 6))
        diet_nutrients.plot(kind='bar', ax=ax, color=['#FF6B6B', '#4ECDC4', '#45B7D1'])
        ax.set_title('Average Macronutrient Content by Diet Type', fontsize=14, fontweight='bold')
        ax.set_xlabel('Diet Type', fontsize=12)
        ax.set_ylabel('Grams', fontsize=12)
        ax.legend(['Protein', 'Carbs', 'Fat'])
        plt.xticks(rotation=45, ha='right')
        
        image_base64 = plot_to_base64()
        return {"image": f"data:image/png;base64,{image_base64}"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/scatter-plot")
def get_scatter_plot():
    """Nutrient relationships (protein vs carbs)"""
    try:
        fig, ax = plt.subplots(figsize=(10, 6))
        ax.scatter(df['Protein'], df['Carbs'], alpha=0.6, s=50, color='#FF6B6B')
        ax.set_title('Nutrient Relationships: Protein vs Carbs', fontsize=14, fontweight='bold')
        ax.set_xlabel('Protein (g)', fontsize=12)
        ax.set_ylabel('Carbs (g)', fontsize=12)
        ax.grid(True, alpha=0.3)
        
        image_base64 = plot_to_base64()
        return {"image": f"data:image/png;base64,{image_base64}"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/heatmap")
def get_heatmap():
    """Nutrient correlations"""
    try:
        # Select only numeric columns
        numeric_cols = df.select_dtypes(include=['number']).columns
        correlation_matrix = df[numeric_cols].corr()
        
        fig, ax = plt.subplots(figsize=(10, 8))
        sns.heatmap(correlation_matrix, annot=True, fmt='.2f', cmap='coolwarm', ax=ax, cbar_kws={'label': 'Correlation'})
        ax.set_title('Nutrient Correlations Heatmap', fontsize=14, fontweight='bold')
        
        image_base64 = plot_to_base64()
        return {"image": f"data:image/png;base64,{image_base64}"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/pie-chart")
def get_pie_chart():
    """Recipe distribution by diet type"""
    try:
        diet_counts = df['Diet Type'].value_counts()
        colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
        
        fig, ax = plt.subplots(figsize=(10, 8))
        ax.pie(diet_counts.values, labels=diet_counts.index, autopct='%1.1f%%', colors=colors, startangle=90)
        ax.set_title('Recipe Distribution by Diet Type', fontsize=14, fontweight='bold')
        
        image_base64 = plot_to_base64()
        return {"image": f"data:image/png;base64,{image_base64}"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/nutritional-insights")
def get_nutritional_insights(diet_type: str = "All"):
    """Get nutritional insights filtered by diet type"""
    try:
        if diet_type != "All":
            filtered_df = df[df['Diet Type'] == diet_type]
        else:
            filtered_df = df
        
        insights = {
            "total_recipes": len(filtered_df),
            "avg_protein": round(filtered_df['Protein'].mean(), 2),
            "avg_carbs": round(filtered_df['Carbs'].mean(), 2),
            "avg_fat": round(filtered_df['Fat'].mean(), 2),
            "diet_type": diet_type
        }
        return insights
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/recipes")
def get_recipes(diet_type: str = "All"):
    """Get recipes filtered by diet type"""
    try:
        if diet_type != "All":
            filtered_df = df[df['Diet Type'] == diet_type]
        else:
            filtered_df = df
        
        recipes = filtered_df.head(10).to_dict(orient='records')
        return {"recipes": recipes, "total": len(filtered_df)}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/clusters")
def get_clusters():
    """Get data clusters"""
    try:
        clusters = {
            "high_protein": len(df[df['Protein'] > df['Protein'].mean()]),
            "high_carbs": len(df[df['Carbs'] > df['Carbs'].mean()]),
            "high_fat": len(df[df['Fat'] > df['Fat'].mean()]),
            "balanced": len(df[(df['Protein'] > df['Protein'].mean()) & (df['Carbs'] > df['Carbs'].mean())])
        }
        return clusters
    except Exception as e:
        return {"error": str(e)}

@app.get("/")
def read_root():
    return {"message": "Nutritional Insights API is running!"}
from django.urls import path
from .views import *

urlpatterns = [
    path('cards/', CardsView.as_view(), name='cards'),
    path('categories/', CategoryView.as_view(), name='categories'),
    path('categories/suggest/', CategorySuggestView.as_view(), name='categories-suggest'),

]
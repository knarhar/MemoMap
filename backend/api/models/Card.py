from django.db import models
from django.contrib import admin

class Card(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ManyToManyField('Category', related_name="cards", blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'created', 'updated')
    list_filter = ('category',)
    search_fields = ('title', 'created')
